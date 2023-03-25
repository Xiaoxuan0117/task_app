import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { EditTaskState, EditTaskPayload } from "../type";

const initialState: EditTaskState = {
  title: "",
  status: "",
  body: "",
  isUploading: false,
  isSuccess: false,
  inputError: { title: false, status: false, body: false },
};

export const UpdateTask = createAsyncThunk<
  EditTaskPayload,
  undefined,
  {
    state: {
      user: { name: string };
      editTask: {
        title: string;
        status: string;
        body: string;
      };
      taskDetail: { repo: string; number: number; labels: string[] };
    };
  }
>("editTask/UpdateTask", async (_, { getState, rejectWithValue }) => {
  const {
    user: { name },
    editTask: { title, status, body },
    taskDetail: { repo, number, labels },
  } = getState();

  function countWords(str: string) {
    var matches = str.match(/[\u00ff-\uffff]|\S+/g);
    return matches ? matches.length : 0;
  }
  console.log("body", body, countWords(body));
  if (!title || !status || !body) {
    const inputError = {
      title: !title,
      status: !status,
      body: !body || countWords(body) < 30,
    };
    return { inputError, isSuccess: false };
  }

  try {
    // const resData = await axios.post(
    //   "/api/updateTask",
    //   {
    //     title,
    //     body,
    //     status,
    //   },
    //   {
    //     params: {
    //       owner: name,
    //       repo,
    //       issue_number: number
    //     },
    //   }
    // );

    // console.log("resData", resData);
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

export const editTaskSlice = createSlice({
  name: "editTask",
  initialState,
  reducers: {
    syncEditTask(state, action) {
      state.title = action.payload.title;
      state.status = action.payload.status;
      state.body = action.payload.body;
    },
    setEditTitle(state, action) {
      state.title = action.payload;
      state.inputError.title = false;
    },
    selectStatus(state, action) {
      state.status = action.payload;
      state.inputError.status = false;
    },
    setEditBody(state, action) {
      state.body = action.payload;
      state.inputError.body = false;
    },
    resetAddTask() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(UpdateTask.pending, (state) => {
        state.isUploading = true;
      })
      .addCase(UpdateTask.fulfilled, (state, action) => {
        state.isUploading = false;
        state.isSuccess = action.payload.isSuccess;
        state.inputError = action.payload.inputError;
      })
      .addCase(UpdateTask.rejected, (state, action) => {
        state.isUploading = false;
      });
  },
});

export const {
  syncEditTask,
  setEditTitle,
  selectStatus,
  setEditBody,
  resetAddTask,
} = editTaskSlice.actions;

export default editTaskSlice.reducer;
