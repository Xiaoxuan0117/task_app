import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  CommentType,
  GetTaskDetailPayLoad,
  GetTaskDetailResData,
  TaskDetailState,
  TaskRequiredInfo,
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
  repo: "",
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
  isStateLoading: false,
};

export const GetTaskDetail = createAsyncThunk<
  GetTaskDetailPayLoad,
  TaskRequiredInfo,
  {}
>(
  "taskDetail/GetTaskDetail",
  async ({ owner, repo, number }, { dispatch, rejectWithValue }) => {
    try {
      const resData = await axios.get("/api/taskDetail", {
        params: {
          owner,
          repo,
          issue_number: number,
        },
      });
      console.log("task detail", resData.data);
      const {
        assignee,
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

      console.log(commentsData);

      const status = labels_arr.filter(
        (label) =>
          label.match(/^ToDo$/gi) ||
          label.match(/^In\sProgress$/gi) ||
          label.match(/^Done$/gi)
      )[0];
      console.log("status", labels_arr, status);
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
        body: body,
        time: created_at,
        issueUrl: html_url,
        id: id,
        number: number,
        repo: repo,
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
      return rejectWithValue(`status: ${status} / error message: ${message}`);
    }
  }
);

export const UpdateDetailState = createAsyncThunk<
  { state: boolean },
  TaskRequiredInfo,
  {
    state: { taskDetail: { isOpen: boolean } };
  }
>(
  "task/UpdateDetailState",
  async ({ owner, repo, number }, { getState, rejectWithValue }) => {
    const { isOpen } = getState().taskDetail;
    console.log("should in here");

    try {
      const resData = await axios.get("/api/updateState", {
        params: {
          owner: owner,
          repo: repo,
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
        return state;
      })
      .addCase(UpdateDetailState.pending, (state) => {
        state.isStateLoading = true;
      })
      .addCase(UpdateDetailState.fulfilled, (state, action) => {
        state.isStateLoading = false;
        state.isOpen = action.payload.state;
      })
      .addCase(UpdateDetailState.rejected, (state, action) => {
        state.isStateLoading = false;
        state.errMsg = `sorry! something went wrong! ${action.payload}`;
      });
  },
});

export const { UpdateTaskDetailState, resetTaskDetail } =
  taskDetailSlice.actions;

export default taskDetailSlice.reducer;
