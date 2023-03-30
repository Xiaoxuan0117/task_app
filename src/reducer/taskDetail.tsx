import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AppDispatch } from "../store";
import {
  Assignee,
  CommentType,
  GetTaskDetailPayLoad,
  GetTaskDetailResData,
  TaskDetailState,
  TaskRequiredInfo,
  userState,
} from "../type";
import { syncEditTask } from "./editTask";

const initialState: TaskDetailState = {
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

export const GetTaskDetail = createAsyncThunk<
  GetTaskDetailPayLoad,
  TaskRequiredInfo,
  {
    state: { user: userState };
  }
>(
  "taskDetail/GetTaskDetail",
  async (
    { repoOwner, repoName, number },
    { getState, dispatch, rejectWithValue }
  ) => {
    const { token } = getState().user;

    if (!token) {
      return rejectWithValue("no token");
    }
    try {
      const resData = await axios.get("/api/taskDetail", {
        params: {
          owner: repoOwner,
          repo: repoName,
          issue_number: number,
        },
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
      }: GetTaskDetailResData = resData.data;
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
        syncEditTask({
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
      const {
        response: {
          status,
          data: { message },
        },
      } = err;
      dispatch(setErrorStatusTaskDetail(status));
      return rejectWithValue(`status: ${status} / error message: ${message}`);
    }
  }
);

export const UpdateDetailState = createAsyncThunk<
  { state: boolean },
  TaskRequiredInfo,
  { dispatch: AppDispatch; state: { taskDetail: { isOpen: boolean } } }
>(
  "task/UpdateDetailState",
  async (
    { repoOwner, repoName, number },
    { dispatch, getState, rejectWithValue }
  ) => {
    const { isOpen } = getState().taskDetail;

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
      dispatch(setErrorStatusTaskDetail(status));
      return rejectWithValue(`status: ${status} / error message: ${message}`);
    }
  }
);

export const taskDetailSlice = createSlice({
  name: "taskDetail",
  initialState,
  reducers: {
    UpdateTaskDetailState(state, action) {
      state.isOpen = action.payload;
    },
    toggleDetail(state) {
      state.isDetailOpen = !state.isDetailOpen;
    },
    setErrorStatusTaskDetail(state, action) {
      state.errStatus = action.payload;
    },
    resetTaskDetail() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetTaskDetail.pending, (state) => {
        state.isLoading = true;
        return state;
      })
      .addCase(GetTaskDetail.fulfilled, (state, action) => {
        state = { ...state, ...action.payload, isLoading: false, errMsg: "" };
        return state;
      })
      .addCase(GetTaskDetail.rejected, (state, action) => {
        state = {
          ...initialState,
          isLoading: false,
          errMsg: `sorry! something went wrong! ${action.payload}`,
        };
        console.log("detail", action.error);
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
  UpdateTaskDetailState,
  resetTaskDetail,
  toggleDetail,
  setErrorStatusTaskDetail,
} = taskDetailSlice.actions;

export default taskDetailSlice.reducer;
