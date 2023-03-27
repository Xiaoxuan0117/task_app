import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AppDispatch } from "../store";
import { GetUserPayload, ShowRepo, userState } from "../type";
import { selectRepo } from "./addTask";

const initialState: userState = {
  name: "",
  avatar: "",
  userUrl: "",
  repoList: [],
  isLoading: false,
  errMsg: "",
  showRepo: { repoOwner: "", repoName: "" },
};

export const GetUser = createAsyncThunk<
  GetUserPayload,
  ShowRepo,
  {
    dispatch: AppDispatch;
  }
>(
  "user/GetUser",
  async ({ repoOwner, repoName }, { dispatch, rejectWithValue }) => {
    console.log("get user");
    try {
      const resData = await axios.get("/api/user");
      console.log("resData", resData);
      const { login, avatar_url, html_url } = resData.data;
      const repoData = await axios.get("/api/repos");
      console.log("repoData", repoData);
      const repos = repoData.data.map(
        (repo: { id: number; name: string; owner: { login: string } }) => {
          return {
            id: repo.id,
            repoName: repo.name,
            repoOwner: repo.owner.login,
          };
        }
      );
      console.log("repoData", repoData);

      if (repoOwner && repoName) {
        dispatch(
          setShowRepo({
            repoOwner: repoOwner,
            repoName: repoName,
          })
        );
        dispatch(selectRepo(repoName));
      } else {
        dispatch(setShowRepo({ repoOwner: login, repoName: "" }));
        dispatch(selectRepo(""));
      }
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
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setShowRepo(state, action) {
      state.showRepo.repoOwner = action.payload.repoOwner;
      state.showRepo.repoName = action.payload.repoName;
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
      });
  },
});

export const { setShowRepo, resetUser } = userSlice.actions;

export default userSlice.reducer;
