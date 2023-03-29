import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AppDispatch } from "../store";
import { EditTaskState, EditTaskPayload } from "../type";

const initialState: EditTaskState = {
  title: "",
  status: "",
  body: "",
  isUploading: false,
  isSuccess: false,
  inputError: { title: false, status: false, body: false },
  errMsg: "",
  errStatus: 404,
};

export const UpdateTask = createAsyncThunk<
  EditTaskPayload,
  undefined,
  {
    dispatch: AppDispatch;
    state: {
      user: { showRepo: { repoOwner: string; repoName: string } };
      editTask: {
        title: string;
        status: string;
        body: string;
      };
      taskDetail: { number: number; labels: string[] };
    };
  }
>("editTask/UpdateTask", async (_, { dispatch, getState, rejectWithValue }) => {
  const {
    user: {
      showRepo: { repoOwner, repoName },
    },
    editTask: { title, status, body },
    taskDetail: { number, labels },
  } = getState();

  function countWords(str: string) {
    var matches = str.match(/[\u00ff-\uffff]|\S+/g);
    return matches ? matches.length : 0;
  }

  if (!title || !status || !body || countWords(body) < 30) {
    const inputError = {
      title: !title,
      status: !status,
      body: !body || countWords(body) < 30,
    };
    return { inputError, isSuccess: false };
  }

  const otherLabels = labels.filter(
    (label) =>
      !label.match(/^ToDo$/gi) &&
      !label.match(/^In\sProgress$/gi) &&
      !label.match(/^Done$/gi)
  );

  try {
    await axios.post(
      "/api/updateTask",
      {
        title,
        body,
        labels: [status].concat(otherLabels),
      },
      {
        params: {
          owner: repoOwner,
          repo: repoName,
          issue_number: number,
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
    dispatch(setErrorStatusEditTask(status));
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
    setErrorStatusEditTask(state, action) {
      state.errStatus = action.payload;
    },
    resetUpdateResult(state) {
      state.isSuccess = false;
      state.errMsg = "";
    },
    resetEditTask() {
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
        state.errMsg = "";
      })
      .addCase(UpdateTask.rejected, (state, action) => {
        state.isUploading = false;
        state.errMsg = `sorry! something went wrong! ${action.payload}`;
      });
  },
});

export const {
  syncEditTask,
  setEditTitle,
  selectStatus,
  setEditBody,
  setErrorStatusEditTask,
  resetEditTask,
  resetUpdateResult,
} = editTaskSlice.actions;

export default editTaskSlice.reducer;
