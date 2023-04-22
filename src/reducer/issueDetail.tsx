import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AppDispatch } from "../store";
import {
  Assignee,
  CommentType,
  GetIssueDetailParam,
  GetIssueDetailPayLoad,
  GetIssueDetailResData,
  IssueDetailState,
  IssueRequiredInfo,
  UserState,
} from "../type";
import { syncEditIssue } from "./editIssue";

const initialState: IssueDetailState = {
  assigneeAvatar: "",
  assigneeUrl: "",
  body: "",
  time: "",
  issueUrl: "",
  id: 0,
  number: 0,
  repoName: "",
  isOpen: true,
  title: "",
  creator: "",
  creatorUrl: "",
  creatorAvatar: "",
  labels: [],
  commentsData: [],
  milestone: "",
  milestoneUrl: "",
  isLoading: true,
  errMsg: "",
  errStatus: 404,
  isStateLoading: false,
  isDetailOpen: false,
};

export const GetIssueDetail = createAsyncThunk<
  GetIssueDetailPayLoad,
  GetIssueDetailParam,
  {
    state: { user: UserState };
  }
>(
  "issueDetail/GetIssueDetail",
  async (
    { repoOwner, repoName, number, signal },
    { getState, dispatch, rejectWithValue }
  ) => {
    const { token } = getState().user;

    if (!token) {
      return rejectWithValue("no token");
    }
    try {
      const resData = await axios.get("/api/issueDetail", {
        params: {
          owner: repoOwner,
          repo: repoName,
          issue_number: number,
        },
        signal: signal,
      });

      const {
        assignee,
        assignees,
        body,
        created_at,
        html_url,
        id,
        state,
        title,
        user,
        labels,
        comments_data,
        milestone,
      }: GetIssueDetailResData = resData.data;
      const labels_arr = labels.map((label: { name: string }) => label.name);
      const assignees_arr = assignees.map((assignee: Assignee) => ({
        id: assignee.id,
        avatar_url: assignee.avatar_url,
        html_url: assignee.html_url,
      }));
      const { avatar_url, html_url: assignee_url } = assignee || {};
      const { login, html_url: user_url, avatar_url: user_avatar } = user || {};
      const { title: milestone_title, html_url: milestone_url } =
        milestone || {};

      const commentsData = comments_data.map((comment: CommentType) => {
        const { id, body, user, created_at } = comment;
        return {
          id,
          children: body,
          avatar: user.avatar_url,
          username: user.login,
          user_url: user.html_url,
          created_at,
        };
      });

      const status = labels_arr.filter(
        (label) =>
          label.match(/^ToDo$/gi) ||
          label.match(/^In\sProgress$/gi) ||
          label.match(/^Done$/gi)
      )[0];

      dispatch(
        syncEditIssue({
          title: title || "",
          status: status || "",
          body: body || "",
        })
      );
      return {
        assigneeAvatar: avatar_url,
        assigneeUrl: assignee_url,
        assignees: assignees_arr,
        body: body,
        time: created_at,
        issueUrl: html_url,
        id: id,
        number: number,
        repoName: repoName,
        isOpen: state === "open" ? true : false,
        title: title,
        creator: login,
        creatorUrl: user_url,
        creatorAvatar: user_avatar,
        labels: labels_arr,
        commentsData: commentsData,
        milestone: milestone_title,
        milestoneUrl: milestone_url,
      };
    } catch (err: any) {
      if (signal?.aborted) {
        return rejectWithValue("Pause Data Fetching");
      }
      const {
        response: {
          status,
          data: { message },
        },
      } = err;
      dispatch(setErrorStatusIssueDetail(status));
      return rejectWithValue(`status: ${status} / error message: ${message}`);
    }
  }
);

export const UpdateDetailState = createAsyncThunk<
  { state: boolean },
  IssueRequiredInfo,
  { dispatch: AppDispatch; state: { issueDetail: { isOpen: boolean } } }
>(
  "issue/UpdateDetailState",
  async (
    { repoOwner, repoName, number },
    { dispatch, getState, rejectWithValue }
  ) => {
    const { isOpen } = getState().issueDetail;

    try {
      const resData = await axios.get("/api/updateState", {
        params: {
          owner: repoOwner,
          repo: repoName,
          issue_number: number,
          state: !isOpen ? "open" : "closed",
        },
      });

      return { state: resData.data === "open" ? true : false };
    } catch (err: any) {
      const {
        response: {
          status,
          data: { message },
        },
      } = err;
      dispatch(setErrorStatusIssueDetail(status));
      return rejectWithValue(`status: ${status} / error message: ${message}`);
    }
  }
);

export const issueDetailSlice = createSlice({
  name: "issueDetail",
  initialState,
  reducers: {
    UpdateIssueDetailState(state, action) {
      state.isOpen = action.payload;
    },
    toggleDetail(state) {
      state.isDetailOpen = !state.isDetailOpen;
    },
    setErrorStatusIssueDetail(state, action) {
      state.errStatus = action.payload;
    },
    resetIssueDetail() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetIssueDetail.pending, (state) => {
        state.isLoading = true;
        return state;
      })
      .addCase(GetIssueDetail.fulfilled, (state, action) => {
        state = { ...state, ...action.payload, isLoading: false, errMsg: "" };
        return state;
      })
      .addCase(GetIssueDetail.rejected, (state, action) => {
        state = {
          ...initialState,
          isLoading: false,
          errMsg: `sorry! something went wrong! ${action.payload}`,
        };
        return state;
      })
      .addCase(UpdateDetailState.pending, (state) => {
        state.isStateLoading = true;
      })
      .addCase(UpdateDetailState.fulfilled, (state, action) => {
        state.isStateLoading = false;
        state.isOpen = action.payload.state;
        state.errMsg = "";
      })
      .addCase(UpdateDetailState.rejected, (state, action) => {
        state.isStateLoading = false;
        state.errMsg = `sorry! something went wrong! ${action.payload}`;
      });
  },
});

export const {
  UpdateIssueDetailState,
  resetIssueDetail,
  toggleDetail,
  setErrorStatusIssueDetail,
} = issueDetailSlice.actions;

export default issueDetailSlice.reducer;
