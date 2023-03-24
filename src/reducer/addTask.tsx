import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AddTaskState, PostTaskPayload } from "../type";

const initialState: AddTaskState = {
  title: "",
  repo: "",
  body: "",
  isUploading: false,
  isSuccess: false,
  inputError: { title: false, repo: false, body: false },
};

export const PostTask = createAsyncThunk<
  PostTaskPayload,
  undefined,
  {
    state: {
      user: { name: string };
      addTask: {
        title: string;
        repo: string;
        body: string;
      };
    };
  }
>("addTask/PostTask", async (_, { getState, rejectWithValue }) => {
  const { name } = getState().user;
  const { title, repo, body } = getState().addTask;

  if (!title || !repo || !body) {
    const inputError = { title: !title, repo: !repo, body: !body };
    return { inputError, isSuccess: false };
  }

  try {
    const resData = await axios.post(
      "/api/postTask",
      {
        title,
        body,
      },
      {
        params: {
          owner: name,
          repo,
        },
      }
    );

    console.log("resData", resData);
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
      });
  },
});

export const { selectRepo, setAddTitle, setAddBody } = addTaskSlice.actions;

export default addTaskSlice.reducer;
