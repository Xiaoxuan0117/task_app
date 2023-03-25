import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { EditTaskState, EditTaskPayload } from "../type";

const initialState: EditTaskState = {
  title: "",
  labels: "",
  body: "",
  isUploading: false,
  isSuccess: false,
  inputError: { title: false, labels: false, body: false },
};

export const UpdateTask = createAsyncThunk<
  EditTaskPayload,
  undefined,
  {
    state: {
      user: { name: string };
      editTask: {
        title: string;
        labels: string;
        body: string;
      };
      taskDetail: { repo: string; number: number };
    };
  }
>("editTask/UpdateTask", async (_, { getState, rejectWithValue }) => {
  const {
    user: { name },
    editTask: { title, labels, body },
    taskDetail: { repo, number },
  } = getState();

  function countWords(str: string) {
    var matches = str.match(/[\u00ff-\uffff]|\S+/g);
    return matches ? matches.length : 0;
  }
  console.log("body", body, countWords(body));
  if (!title || !labels || !body) {
    const inputError = {
      title: !title,
      labels: !labels,
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
    //     labels,
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
    setEditTitle(state, action) {
      state.title = action.payload;
      state.inputError.title = false;
    },
    selectLabels(state, action) {
      state.inputError.labels = false;
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

export const { setEditTitle, selectLabels, setEditBody, resetAddTask } =
  editTaskSlice.actions;

export default editTaskSlice.reducer;
