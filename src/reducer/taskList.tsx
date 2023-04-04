import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  TaskProps,
  TaskListState,
  GetTaskListPayload,
  GetTaskListParams,
  GetTaskListResData,
  UpdateStatePayload,
  TaskRequiredInfo,
  UserState,
} from "../type";
import axios from "axios";
import { AppDispatch } from "../store";
import { resetAddTask } from "./addTask";

const initialState: TaskListState = {
  isLoading: false,
  taskList: [],
  page: 1,
  errMsg: "",
  errStatus: 404,
  isAll: false,
  showRepo: { repoOwner: "", repoName: "" },
  filter: {
    state: "all",
    labels: "all",
    category: "all",
    direction: "desc",
  },
  isStateLoading: false,
  taskSearchKeyword: "",
  isSearchMode: false,
  isFilterOpen: false,
};

export const TriggerGetTaskList = createAsyncThunk<
  boolean,
  { signal?: AbortSignal; firstTime: boolean },
  {
    dispatch: AppDispatch;
    state: {
      taskList: TaskListState;
    };
  }
>(
  "taskList/TriggerGetTaskList",
  async ({ signal, firstTime }, { getState, dispatch }) => {
    const { isAll, isLoading } = getState().taskList;
    if (!isAll && !isLoading) {
      if (firstTime) {
        await dispatch(GetTaskList({ reLoad: true, signal: signal }));
      } else {
        await dispatch(GetTaskList({ reLoad: false, signal: signal }));
      }
    }
    return true;
  }
);

export const GetTaskList = createAsyncThunk<
  GetTaskListPayload,
  GetTaskListParams,
  {
    dispatch: AppDispatch;
    state: {
      taskList: TaskListState;
      user: UserState;
    };
  }
>(
  "taskList/GetTaskList",
  async ({ reLoad, signal }, { dispatch, getState, rejectWithValue }) => {
    const {
      taskList: {
        page,
        filter: { state, labels, category, direction },
        isSearchMode,
        taskSearchKeyword,
        showRepo: { repoOwner, repoName },
      },
      user: { name, token },
    } = getState();

    if (!token) {
      return rejectWithValue("no token");
    }

    if (reLoad) {
      dispatch(resetTaskList());
      dispatch(resetAddTask());
    }

    let resData = [];

    const search = async () => {
      const stateQuery = state === ("open" || "closed") ? `state:${state}` : "";

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
        labelQuery = labelQuery + `,"${labels}"`;
      } else if (labels !== "all" && labels.length) {
        labelQuery = `label:"${labels}"`;
      }

      const repoQuery = () => {
        if (!repoName) {
          return "";
        } else {
          return `repo:${repoOwner}/${repoName}`;
        }
      };

      let queryString = `is:issue involves:${name} ${repoQuery()} ${stateQuery} ${categoryQuery(
        category
      )} ${labelQuery} ${keyword} in:title,body,comments`;

      queryString = queryString.replace(/\s\s+/g, " ");
      console.log("qqq", queryString);

      try {
        const resResult = await axios.get("/api/taskSearch", {
          params: {
            query: queryString,
            order: direction,
            page: reLoad ? 1 : page,
          },
          signal: signal,
        });

        return resResult.data.items;
      } catch (err: any) {
        if (signal?.aborted) {
          return "Pause Data Fetching";
        }
        const {
          response: {
            status,
            data: { message },
          },
        } = err;
        dispatch(setErrorStatusTaskList(status));
        return `status: ${status} / error message: ${message}`;
      }
    };

    const list = async () => {
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

      try {
        const resResult = await axios({
          url: "/api/taskList/",
          method: "get",
          params: {
            owner: repoOwner,
            repo: repoName || "",
            page: reLoad ? 1 : page,
            state: state,
            labels: labels === "all" ? "" : labels,
            category: category,
            direction: direction,
            ...repoCategory(category),
          },
          signal: signal,
        });

        return resResult.data;
      } catch (err: any) {
        if (signal?.aborted) {
          return "Pause Data Fetching";
        }
        const {
          response: {
            status,
            data: { message },
          },
        } = err;
        dispatch(setErrorStatusTaskList(status));
        return `status: ${status} / error message: ${message}`;
      }
    };

    if (isSearchMode) {
      resData = await search();
    } else {
      resData = await list();
    }

    console.log("resData", resData);
    if (typeof resData === "string") {
      return rejectWithValue(resData);
    }
    const issueData: TaskProps[] = resData.map((issue: GetTaskListResData) => {
      const {
        assignee,
        created_at,
        html_url,
        id,
        labels,
        number,
        repository,
        repository_url,
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

      const getRepoName = () => {
        if (isSearchMode) {
          const arr = repository_url.split("/");
          return arr[arr.length - 1];
        } else if (!repository_name) {
          return repoName;
        } else {
          return repository_name;
        }
      };
      return {
        assigneeAvatar: avatar_url,
        assigneeUrl: assignee_url,
        body,
        time: created_at,
        issueUrl: html_url,
        id,
        labels: labels_arr,
        number,
        repoName: getRepoName(),
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
    });

    return {
      issueData,
      page: issueData.length < 10 ? 0 : 1,
      isAll: issueData.length < 10 ? true : false,
      reLoad,
    };
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

  if (!isLoading) {
    dispatch(changeFilterState({ type, option }));
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
    setShowRepo(state, action) {
      state.showRepo.repoOwner = action.payload.repoOwner;
      state.showRepo.repoName = action.payload.repoName;
    },
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
    setErrorStatusTaskList(state, action) {
      state.errStatus = action.payload;
    },
    resetTaskList(state) {
      state = {
        ...initialState,
        showRepo: state.showRepo,
      };
      return;
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
        state.errMsg = `sorry! something went wrong! ${action.payload} ${
          action.error.message && action.error.message
        }`;
        state.taskList = [];
        state.page = 1;
        state.isAll = false;
        console.log("task", action.error);
        return state;
      })
      .addCase(TriggerGetTaskList.pending, (state, action) => {
        if (action.meta.arg.firstTime) {
          state.isAll = false;
        }
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
  setShowRepo,
  changeFilterState,
  setTaskSearchKeyword,
  taskSearch,
  toggleFilter,
  resetTaskList,
  setErrorStatusTaskList,
} = taskListSlice.actions;

export default taskListSlice.reducer;
