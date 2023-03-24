import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AppDispatch } from "../store";
import { GetUserPayload, RepoState, userState } from "../type";

const initialState: userState = {
  name: "",
  avatar: "",
  userUrl: "",
  repoList: [],
  isLoading: false,
  errMsg: "",
  showRepo: "myIssue",
};

export const GetUser = createAsyncThunk<
  GetUserPayload,
  string | undefined,
  {
    dispatch: AppDispatch;
  }
>("user/GetUser", async (repo, { dispatch, rejectWithValue }) => {
  try {
    const resData = await axios.get("/api/user");
    console.log("resData", resData);
    const { name, avatar_url, html_url } = resData.data;
    const repoData = await axios.get("/api/repos");
    console.log("repoData", repoData);
    const repos = repoData.data.map((repo: RepoState) => {
      return { id: repo.id, name: repo.name };
    });

    if (repo) {
      dispatch(setShowRepo(repo));
    }
    return {
      name: name,
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
    setShowRepo(state, action) {
      state.showRepo = action.payload;
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
      });
  },
});

export const { setShowRepo } = userSlice.actions;

export default userSlice.reducer;
