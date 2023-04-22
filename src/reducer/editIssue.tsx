import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AppDispatch } from "../store";
import { EditIssueState, EditIssuePayload, IssueListState } from "../type";

const initialState: EditIssueState = {
  title: "",
  status: "",
  body: "",
  isUploading: false,
  isSuccess: false,
  inputError: { title: false, status: false, body: false },
  errMsg: "",
  errStatus: 404,
};

export const UpdateIssue = createAsyncThunk<
  EditIssuePayload,
  undefined,
  {
    dispatch: AppDispatch;
    state: {
      issueList: IssueListState;
      editIssue: {
        title: string;
        status: string;
        body: string;
      };
      issueDetail: { number: number; labels: string[] };
    };
  }
>(
  "editIssue/UpdateIssue",
  async (_, { dispatch, getState, rejectWithValue }) => {
    const {
      issueList: {
        showRepo: { repoOwner, repoName },
      },
      editIssue: { title, status, body },
      issueDetail: { number, labels },
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
        "/api/updateIssue",
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
      dispatch(setErrorStatusEditIssue(status));
      return rejectWithValue(`status: ${status} / error message: ${message}`);
    }
  }
);

export const editIssueSlice = createSlice({
  name: "editIssue",
  initialState,
  reducers: {
    syncEditIssue(state, action) {
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
    setErrorStatusEditIssue(state, action) {
      state.errStatus = action.payload;
    },
    resetUpdateResult(state) {
      state.isSuccess = false;
      state.errMsg = "";
    },
    resetEditIssue() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(UpdateIssue.pending, (state) => {
        state.isUploading = true;
      })
      .addCase(UpdateIssue.fulfilled, (state, action) => {
        state.isUploading = false;
        state.isSuccess = action.payload.isSuccess;
        state.inputError = action.payload.inputError;
        state.errMsg = "";
      })
      .addCase(UpdateIssue.rejected, (state, action) => {
        state.isUploading = false;
        state.errMsg = `sorry! something went wrong! ${action.payload}`;
      });
  },
});

export const {
  syncEditIssue,
  setEditTitle,
  selectStatus,
  setEditBody,
  setErrorStatusEditIssue,
  resetEditIssue,
  resetUpdateResult,
} = editIssueSlice.actions;

export default editIssueSlice.reducer;
