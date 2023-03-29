import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AppDispatch } from "../store";
import { AddTaskState, AddTaskPayload } from "../type";

const initialState: AddTaskState = {
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

export const PostTask = createAsyncThunk<
  AddTaskPayload,
  undefined,
  {
    dispatch: AppDispatch;
    state: {
      user: { showRepo: { repoOwner: string; repoName: string } };
      addTask: {
        title: string;
        repo: string;
        body: string;
        repoOwner: string;
      };
    };
  }
>("addTask/PostTask", async (_, { dispatch, getState, rejectWithValue }) => {
  const { title, repo, body, repoOwner } = getState().addTask;

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
      "/api/postTask",
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
    dispatch(setErrorStatusAddTask(status));
    return rejectWithValue(`status: ${status} / error message: ${message}`);
  }
});

export const addTaskSlice = createSlice({
  name: "addTask",
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
    setErrorStatusAddTask(state, action) {
      state.errStatus = action.payload;
    },
    resetSubmitResult(state) {
      state.isSuccess = false;
      state.errMsg = "";
    },
    resetAddTask() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(PostTask.pending, (state) => {
        state.isUploading = true;
      })
      .addCase(PostTask.fulfilled, (state, action) => {
        state.isUploading = false;
        state.isSuccess = action.payload.isSuccess;
        state.inputError = action.payload.inputError;
        state.errMsg = "";
      })
      .addCase(PostTask.rejected, (state, action) => {
        state.isUploading = false;
        state.errMsg = `sorry! something went wrong! ${action.payload}`;
      });
  },
});

export const {
  selectRepo,
  setAddTitle,
  setAddBody,
  setErrorStatusAddTask,
  resetAddTask,
  resetSubmitResult,
} = addTaskSlice.actions;

export default addTaskSlice.reducer;
