import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import cookie from "js-cookie";
import { GetUserPayload, userState } from "../type";

const initialState: userState = {
  name: "",
  avatar: "",
  userUrl: "",
  repoList: [],
  isLoading: false,
  errMsg: "",
  token: false,
};

export const GetUser = createAsyncThunk<
  GetUserPayload,
  undefined,
  { state: { user: userState } }
>("user/GetUser", async (_, { getState, rejectWithValue }) => {
  try {
    const { name, token } = getState().user;

    if (!token) {
      return rejectWithValue("no token");
    }

    if (name) {
      console.log("has name");
      return rejectWithValue("already got user data");
    }

    const resData = await axios.get("/api/user", { withCredentials: true });
    const { login, avatar_url, html_url } = resData.data;
    const repoData = await axios.get("/api/repos");

    const repos = repoData.data.map(
      (repo: { id: number; name: string; owner: { login: string } }) => {
        return {
          id: repo.id,
          repoName: repo.name,
          repoOwner: repo.owner.login,
        };
      }
    );
    return {
      name: login,
      avatar: avatar_url,
      userUrl: html_url,
      repoList: repos,
    };
  } catch (err: any) {
    const {
      response: {
        status,
        data: { message },
      },
    } = err;
    return rejectWithValue(`status: ${status} / error message: ${message}`);
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    checkToken(state) {
      state.token = cookie.get("access_token") ? true : false;
    },
    resetUser() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.name = action.payload.name;
        state.avatar = action.payload.avatar;
        state.userUrl = action.payload.userUrl;
        state.repoList = action.payload.repoList;
      })
      .addCase(GetUser.rejected, (state, action) => {
        state.isLoading = false;
        state.errMsg = `sorry! something went wrong! ${action.payload}`;
        console.log("user", action.error);
      });
  },
});

export const { resetUser, checkToken } = userSlice.actions;

export default userSlice.reducer;
