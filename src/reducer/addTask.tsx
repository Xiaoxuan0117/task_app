import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AddTaskState, AddTaskPayload } from "../type";

const initialState: AddTaskState = {
  title: "",
  repo: "",
  body: "",
  isUploading: false,
  isSuccess: false,
  inputError: { title: false, repo: false, body: false },
  errMsg: "",
};

export const PostTask = createAsyncThunk<
  AddTaskPayload,
  undefined,
  {
    state: {
      user: { showRepo: { repoOwner: string; repoName: string } };
      addTask: {
        title: string;
        repo: string;
        body: string;
      };
    };
  }
>("addTask/PostTask", async (_, { getState, rejectWithValue }) => {
  const { repoOwner, repoName } = getState().user.showRepo;
  const { title, repo, body } = getState().addTask;

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
    const resData = await axios.post(
      "/api/postTask",
      {
        title,
        body,
        labels: ["ToDo"],
      },
      {
        params: {
          owner: repoOwner,
          repo: repoName,
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
    return rejectWithValue(`status: ${status} / error message: ${message}`);
  }
});

export const addTaskSlice = createSlice({
  name: "addTask",
  initialState,
  reducers: {
    selectRepo(state, action) {
      state.repo = action.payload;
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
  resetAddTask,
  resetSubmitResult,
} = addTaskSlice.actions;

export default addTaskSlice.reducer;
