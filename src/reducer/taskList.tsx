import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  TaskProps,
  TaskListState,
  GetTaskListPayload,
  GetTaskListParams,
  GetTaskListResData,
  UpdateStatePayload,
  TaskRequiredInfo,
  userState,
} from "../type";
import axios from "axios";
import cookie from "js-cookie";
import { AppDispatch } from "../store";

const initialState: TaskListState = {
  isLoading: false,
  taskList: [],
  page: 1,
  errMsg: "",
  errStatus: 404,
  isAll: false,
  filter: {
    state: "all",
    labels: "",
    category: "all",
    direction: "desc",
  },
  isStateLoading: false,
  taskSearchKeyword: "",
  isSearchMode: false,
  isFilterOpen: false,
  token: false,
};

export const TriggerGetTaskList = createAsyncThunk<
  boolean,
  undefined,
  {
    dispatch: AppDispatch;
    state: {
      taskList: { isAll: boolean; isLoading: boolean; isSearchMode: boolean };
    };
  }
>("taskList/TriggerGetTaskList", async (_, { getState, dispatch }) => {
  const { isAll, isLoading } = getState().taskList;
  if (!isAll && !isLoading) {
    await dispatch(GetTaskList({ reLoad: false }));
  }
  return true;
});

export const GetTaskList = createAsyncThunk<
  GetTaskListPayload,
  GetTaskListParams,
  {
    dispatch: AppDispatch;
    state: {
      taskList: TaskListState;
      user: userState;
    };
  }
>(
  "taskList/GetTaskList",
  async ({ reLoad }, { dispatch, getState, rejectWithValue }) => {
    const {
      taskList: {
        page,
        filter: { state, labels, category, direction },
        isSearchMode,
        taskSearchKeyword,
      },
      user: {
        name,
        showRepo: { repoOwner, repoName },
      },
    } = getState();

    let resData = [];

    try {
      if (isSearchMode) {
        const stateQuery =
          state === ("open" || "closed") ? `state:${state}` : "";

        const categoryQuery = (category: string) => {
          switch (category) {
            case "created":
              return `author:${name}`;
            case "assignee":
              return `assignee:${name}`;
            case "mentioned":
              return `mentions:${name}`;
            default:
              return "";
          }
        };

        let keyword = "";
        let labelQuery = "";
        if (taskSearchKeyword.indexOf("label:") !== -1) {
          keyword = taskSearchKeyword.slice(
            0,
            taskSearchKeyword.indexOf("label:")
          );
          console.log("keyword", keyword);
          labelQuery = taskSearchKeyword.slice(
            taskSearchKeyword.indexOf("label:"),
            taskSearchKeyword.length
          );
        } else {
          keyword = taskSearchKeyword;
        }
        if (labels !== "all" && labels.length && labelQuery) {
          labelQuery = labelQuery + `,${labels}`;
        } else if (labels !== "all" && labels.length) {
          labelQuery = `label:${labels}`;
        }

        const repoQuery = () => {
          if (!repoName) {
            return "";
          } else {
            return `user:${repoOwner} repo:${repoName}`;
          }
        };

        let queryString = `is:issue involves:${name} ${repoQuery()} ${stateQuery} ${categoryQuery(
          category
        )} ${labelQuery} ${keyword} in:title,body,comments`;

        queryString = queryString.replace(/\s\s+/g, " ");
        console.log("qqq", queryString);

        const resResult = await axios.get("/api/taskSearch", {
          params: {
            query: queryString,
            order: direction,
            page: reLoad ? 1 : page,
          },
        });

        resData = resResult.data.items;
      } else {
        const repoCategory = (category: string) => {
          switch (category) {
            case "created":
              return { creator: name };
            case "assigned":
              return { assignee: name };
            case "mentioned":
              return { mentioned: name };
            default:
              return {};
          }
        };

        const resResult = await axios({
          url: "/api/taskList/",
          method: "get",
          params: {
            owner: repoOwner,
            repo: repoName,
            page: reLoad ? 1 : page,
            state: state,
            labels: labels === "all" ? "" : labels,
            category: category,
            direction: direction,
            ...repoCategory(category),
          },
        });

        resData = resResult.data;
      }

      console.log("resData", resData);
      const issueData: TaskProps[] = resData.map(
        (issue: GetTaskListResData) => {
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
            body,
          } = issue;
          const { avatar_url, html_url: assignee_url } = assignee || {};
          const {
            name: repository_name,
            html_url: repo_url,
            owner,
          } = repository || {};
          const { login: repoLogin } = owner || {};
          const { login, html_url: creatorUrl } = user || {};
          const labels_arr = labels.map((label) => label.name);
          return {
            assigneeAvatar: avatar_url,
            assigneeUrl: assignee_url,
            body,
            time: created_at,
            issueUrl: html_url,
            id,
            labels: labels_arr,
            number,
            repoName: repository_name ? repository_name : repoName,
            repoUrl: repo_url
              ? repo_url
              : `https://github.com/${repoOwner}/${repoName}`,
            repoOwner: repoLogin ? repoLogin : repoOwner,
            isOpen: state === "open" ? true : false,
            title: title,
            creator: login,
            creatorUrl,
            isSearchResult: false,
          };
        }
      );

      return {
        issueData,
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
      dispatch(setErrorStatusTaskList(status));
      return rejectWithValue(`status: ${status} / error message: ${message}`);
    }
  }
);

export const setFilter = createAsyncThunk<
  boolean,
  { type: string; option: string },
  {
    dispatch: AppDispatch;
    state: { taskList: { isLoading: boolean } };
  }
>("taskList/setFilter", async ({ type, option }, { dispatch, getState }) => {
  const { isLoading } = getState().taskList;

  dispatch(changeFilterState({ type, option }));
  if (!isLoading) {
    await dispatch(GetTaskList({ reLoad: true }));
  }
  return true;
});

export const UpdateState = createAsyncThunk<
  UpdateStatePayload,
  TaskRequiredInfo,
  {
    dispatch: AppDispatch;
    state: { taskList: { taskList: TaskProps[] } };
  }
>(
  "task/updateState",
  async (
    { repoOwner, repoName, number },
    { dispatch, getState, rejectWithValue }
  ) => {
    const { taskList } = getState().taskList;

    const taskIndex = taskList.findIndex((task) => {
      return (
        task.repoOwner === repoOwner &&
        task.repoName === repoName &&
        task.number === number
      );
    });
    if (taskIndex === -1) {
      return rejectWithValue("Cannot find the task");
    }
    const currentState = taskList[taskIndex].isOpen;

    try {
      const resData = await axios.get("/api/updateState", {
        params: {
          owner: repoOwner,
          repo: repoName,
          issue_number: number,
          state: !currentState ? "open" : "closed",
        },
      });

      return { taskIndex, state: resData.data === "open" ? true : false };
    } catch (err: any) {
      const {
        response: {
          status,
          data: { message },
        },
      } = err;
      dispatch(setErrorStatusTaskList(status));
      return rejectWithValue(`status: ${status} / error message: ${message}`);
    }
  }
);

export const taskListSlice = createSlice({
  name: "taskList",
  initialState,
  reducers: {
    changeFilterState(
      state,
      action: PayloadAction<{ type: string; option: string }>
    ) {
      state.filter = {
        ...state.filter,
        [action.payload.type]: action.payload.option,
      };
    },
    setTaskSearchKeyword(state, action: PayloadAction<string>) {
      state.taskSearchKeyword = action.payload;
    },
    taskSearch(state) {
      if (state.taskSearchKeyword) {
        state.isSearchMode = true;
      } else {
        state.isSearchMode = false;
      }
    },
    toggleFilter(state) {
      state.isFilterOpen = !state.isFilterOpen;
    },
    checkToken(state) {
      state.token = cookie.get("access_token") ? true : false;
    },
    setErrorStatusTaskList(state, action) {
      state.errStatus = action.payload;
    },
    resetTaskList() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetTaskList.pending, (state, action) => {
        state.isLoading = true;
        if (action.meta.arg.reLoad) {
          state.taskList = [];
          state.page = 1;
          state.isAll = false;
        }
        return state;
      })
      .addCase(GetTaskList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.taskList.push(...(action.payload.issueData || []));
        state.page = state.page + action.payload.page;
        state.isAll = action.payload.isAll;
        state.errMsg = "";
        return state;
      })
      .addCase(GetTaskList.rejected, (state, action) => {
        state.isLoading = false;
        state.errMsg = `sorry! something went wrong! ${action.payload}`;
        state.taskList = [];
        return state;
      })
      .addCase(TriggerGetTaskList.fulfilled, (state, action) => {
        return state;
      })
      .addCase(setFilter.pending, (state) => {
        state.taskSearchKeyword = "";
        state.isSearchMode = false;
      })
      .addCase(UpdateState.pending, (state, action) => {
        state.isStateLoading = true;
      })
      .addCase(UpdateState.fulfilled, (state, action) => {
        state.isStateLoading = false;
        state.taskList[action.payload.taskIndex].isOpen = action.payload.state;
        state.errMsg = "";
      })
      .addCase(UpdateState.rejected, (state, action) => {
        state.isStateLoading = false;
        state.errMsg = `sorry! something went wrong! ${action.payload}`;
        return state;
      });
  },
});

export const {
  changeFilterState,
  setTaskSearchKeyword,
  taskSearch,
  toggleFilter,
  checkToken,
  resetTaskList,
  setErrorStatusTaskList,
} = taskListSlice.actions;

export default taskListSlice.reducer;
