import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  TaskProps,
  TaskListStatus,
  Filter,
  fetchTaskListPayload,
} from "../type";
import axios from "axios";
import { AppDispatch } from "../store";

const initialState: TaskListStatus = {
  isLoading: false,
  taskList: [],
  page: 1,
  errMsg: "",
  isAll: false,
  filter: {
    state: "all",
    labels: "",
    category: "assigned",
    direction: "asc",
  },
};

export const scrollToButtom = createAsyncThunk<
  boolean,
  undefined,
  {
    dispatch: AppDispatch;
    state: { taskList: { isAll: boolean; isLoading: boolean } };
  }
>("taskList/scrollToBottom", async (_, thunkApi) => {
  const { isAll, isLoading } = thunkApi.getState().taskList;
  if (!isAll && !isLoading) {
    await thunkApi.dispatch(fetchTaskList({ reLoad: false }));
  }
  return true;
});

export const fetchTaskList = createAsyncThunk<
  fetchTaskListPayload,
  { reLoad: boolean },
  { state: { taskList: { page: number; filter: Filter } } }
>("taskList/getTaskList", async ({ reLoad }, { getState, rejectWithValue }) => {
  const {
    page,
    filter: { state, labels, category, direction },
  } = getState().taskList;

  try {
    const resData = await axios({
      url: "/api/taskList",
      method: "get",
      params: {
        page: reLoad ? 1 : page,
        state: state,
        labels: labels === "all" ? "" : labels,
        category: category,
        direction: direction,
      },
    });
    console.log(resData.data);
    const issueData: TaskProps[] = resData.data.map(
      (issue: {
        assignee: { avatar_url?: string; html_url?: string };
        created_at: string;
        html_url: string;
        id: string;
        labels: any[];
        number: number;
        repository: { name: string; html_url: string };
        repository_url: string;
        state: string;
        title: string;
        user: { login: string; html_url: string };
      }) => {
        const {
          assignee,
          created_at,
          html_url,
          id,
          labels,
          number,
          repository,
          state,
          title,
          user,
        } = issue;
        const { avatar_url, html_url: assignee_url } = assignee || {};
        const { name: repository_name, html_url: repo_url } = repository || {};
        const { login, html_url: creatorUrl } = user || {};
        const labels_arr = labels.map((label) => label.name);
        return {
          assigneeAvatar: avatar_url,
          assigneeUrl: assignee_url,
          time: created_at,
          issueUrl: html_url,
          id,
          labels: labels_arr,
          number,
          repo: repository_name,
          repoUrl: repo_url,
          isOpen: state === "open" ? true : false,
          issue: title,
          creator: login,
          creatorUrl,
        };
      }
    );
    console.log("almost", issueData);
    return {
      error: false,
      issueData,
      errMsg: "",
      page: issueData.length < 10 ? 0 : 1,
      isAll: issueData.length < 10 ? true : false,
      reLoad,
    };
  } catch (err: any) {
    const {
      response: {
        status,
        data: { message },
      },
    } = err;
    return {
      error: true,
      issueData: [],
      errMsg: `sorry! something went wrong! status: ${status} / error message: ${message}`,
      page: 0,
      isAll: false,
      reLoad,
    };
  }
});

export const setFilter = createAsyncThunk<
  boolean,
  { type: string; option: string },
  {
    dispatch: AppDispatch;
    state: { taskList: { isLoading: boolean } };
  }
>("taskList/setFilter", async ({ type, option }, thunkApi) => {
  const { isLoading } = thunkApi.getState().taskList;
  console.log("type, option", type, option);

  thunkApi.dispatch(changeFilterState({ type, option }));
  if (!isLoading) {
    await thunkApi.dispatch(fetchTaskList({ reLoad: true }));
  }
  return true;
});

export const taskListSlice = createSlice({
  name: "taskList",
  initialState,
  reducers: {
    changeFilterState: (
      state,
      action: PayloadAction<{ type: string; option: string }>
    ) => {
      state.filter = {
        ...state.filter,
        [action.payload.type]: action.payload.option,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTaskList.pending, (state, action) => {
        state.isLoading = true;
        return state;
      })
      .addCase(fetchTaskList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errMsg = action.payload.errMsg;
        if (action.payload.reLoad) {
          state.taskList = [...action.payload.issueData];
          state.page = 2;
          state.isAll = false;
        } else {
          state.taskList.push(...(action.payload.issueData || []));
          state.page = state.page + action.payload.page;
          state.isAll = action.payload.isAll;
        }
        return state;
      })
      .addCase(fetchTaskList.rejected, (state, action) => {
        state.isLoading = false;
        state.errMsg = `sorry! something went wrong! ${action.payload}`;
        state.taskList = [];
        return state;
      })
      .addCase(scrollToButtom.fulfilled, (state, action) => {
        return state;
      });
  },
});

export const { changeFilterState } = taskListSlice.actions;

export default taskListSlice.reducer;
