import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AppDispatch } from "../store";
import { AddIssueState, AddIssuePayload } from "../type";

const initialState: AddIssueState = {
  title: "",
  repo: "",
  body: "",
  repoOwner: "",
  isUploading: false,
  isSuccess: false,
  inputError: { title: false, repo: false, body: false },
  errMsg: "",
  errStatus: 404,
};

export const PostIssue = createAsyncThunk<
  AddIssuePayload,
  undefined,
  {
    dispatch: AppDispatch;
    state: {
      addIssue: AddIssueState;
    };
  }
>("addIssue/PostIssue", async (_, { dispatch, getState, rejectWithValue }) => {
  const { title, repo, body, repoOwner } = getState().addIssue;

  function countWords(str: string) {
    var matches = str.match(/[\u00ff-\uffff]|\S+/g);
    return matches ? matches.length : 0;
  }

  if (!title || !repo || !body || countWords(body) < 30) {
    const inputError = {
      title: !title,
      repo: !repo,
      body: !body || countWords(body) < 30,
    };
    return { inputError, isSuccess: false };
  }

  try {
    await axios.post(
      "/api/postIssue",
      {
        title,
        body,
        labels: ["ToDo"],
      },
      {
        params: {
          owner: repoOwner,
          repo: repo,
        },
      }
    );

    return { inputError: initialState.inputError, isSuccess: true };
  } catch (err: any) {
    const {
      response: {
        status,
        data: { message },
      },
    } = err;
    dispatch(setErrorStatusAddIssue(status));
    return rejectWithValue(`status: ${status} / error message: ${message}`);
  }
});

export const addIssueSlice = createSlice({
  name: "addIssue",
  initialState,
  reducers: {
    selectRepo(state, action) {
      state.repo = action.payload.repoName;
      state.repoOwner = action.payload.repoOwner;
      state.inputError.repo = false;
    },
    setAddTitle(state, action) {
      state.title = action.payload;
      state.inputError.title = false;
    },
    setAddBody(state, action) {
      state.body = action.payload;
      state.inputError.body = false;
    },
    setErrorStatusAddIssue(state, action) {
      state.errStatus = action.payload;
    },
    resetSubmitResult(state) {
      state.isSuccess = false;
      state.errMsg = "";
    },
    resetAddIssue() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(PostIssue.pending, (state) => {
        state.isUploading = true;
      })
      .addCase(PostIssue.fulfilled, (state, action) => {
        state.isUploading = false;
        state.isSuccess = action.payload.isSuccess;
        state.inputError = action.payload.inputError;
        state.errMsg = "";
      })
      .addCase(PostIssue.rejected, (state, action) => {
        state.isUploading = false;
        state.errMsg = `sorry! something went wrong! ${action.payload}`;
      });
  },
});

export const {
  selectRepo,
  setAddTitle,
  setAddBody,
  setErrorStatusAddIssue,
  resetAddIssue,
  resetSubmitResult,
} = addIssueSlice.actions;

export default addIssueSlice.reducer;
