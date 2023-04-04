import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import cookie from "js-cookie";
import { GetUserPayload, UserState } from "../type";
import { AppDispatch } from "../store";

const initialState: UserState = {
  name: "",
  avatar: "",
  userUrl: "",
  repoList: [],
  isLoading: false,
  errMsg: "",
  errStatus: 200,
  token: false,
};

export const GetUser = createAsyncThunk<
  GetUserPayload,
  { signal?: AbortSignal },
  { dispatch: AppDispatch; state: { user: UserState } }
>(
  "user/GetUser",
  async ({ signal }, { dispatch, getState, rejectWithValue }) => {
    try {
      const { name, token } = getState().user;

      if (!token) {
        return rejectWithValue("No token");
      }

      if (name) {
        console.log("has name");
        return rejectWithValue("Already got user data");
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
      if (signal?.aborted) {
        return rejectWithValue(`Pause data fetching`);
      }
      const {
        response: {
          status,
          data: { message },
        },
      } = err;
      if (status) {
        dispatch(setErrorStatusUser(status));
      }
      return rejectWithValue(
        `status: ${status} / error message: ${message} / User data fetch failed`
      );
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    checkToken(state) {
      state.token = cookie.get("access_token") ? true : false;
    },
    setErrorStatusUser(state, action) {
      state.errStatus = action.payload;
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

export const { checkToken, setErrorStatusUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
