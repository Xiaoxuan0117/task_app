import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  TaskProps,
  TaskListStatus,
  Filter,
  GetTaskListPayload,
  GetTaskListParams,
  GetTaskListResData,
  UpdateStatePayload,
  TaskRequiredInfo,
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
    category: "created",
    direction: "desc",
  },
  isStateLoading: false,
  taskSearchKeyword: "",
  isSearchMode: false,
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
>("taskList/scrollToBottom", async (_, { getState, dispatch }) => {
  const { isAll, isLoading, isSearchMode } = getState().taskList;
  if (!isAll && !isLoading) {
    await dispatch(GetTaskList({ reLoad: false }));
    if (isSearchMode) {
      dispatch(taskSearch());
    }
  }
  return true;
});

export const GetTaskList = createAsyncThunk<
  GetTaskListPayload,
  GetTaskListParams,
  {
    state: {
      taskList: {
        page: number;
        filter: Filter;
      };
      user: {
        name: string;
        showRepo: { repoOwner: string; name: string };
      };
    };
  }
>("taskList/getTaskList", async ({ reLoad }, { getState, rejectWithValue }) => {
  const {
    taskList: {
      page,
      filter: { state, labels, category, direction },
    },
    user: {
      name,
      showRepo: { repoOwner, name: repoName },
    },
  } = getState();

  const repoCategory = (category: string) => {
    switch (category) {
      case "created":
        return { created: name };
      case "assigned":
        return { assignee: name };
      case "mentioned":
        return { mentioned: name };
    }
  };

  try {
    const resData = await axios({
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
    console.log(resData.data);
    const issueData: TaskProps[] = resData.data.map(
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
          repo: repository_name ? repository_name : repoName,
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
    return rejectWithValue(`status: ${status} / error message: ${message}`);
  }
});

export const setFilter = createAsyncThunk<
  boolean,
  { type: string; option: string },
  {
    dispatch: AppDispatch;
    state: { taskList: { isLoading: boolean } };
  }
>("taskList/setFilter", async ({ type, option }, { dispatch, getState }) => {
  const { isLoading } = getState().taskList;
  console.log("type, option", type, option);

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
    state: { taskList: { taskList: TaskProps[] } };
  }
>(
  "task/updateState",
  async ({ owner, repo, number }, { getState, rejectWithValue }) => {
    const { taskList } = getState().taskList;

    const taskIndex = taskList.findIndex((task) => {
      return (
        task.creator === owner && task.repo === repo && task.number === number
      );
    });
    if (taskIndex === -1) {
      return rejectWithValue("no task found");
    }
    const currentState = taskList[taskIndex].isOpen;

    try {
      const resData = await axios.get("/api/updateState", {
        params: {
          owner: owner,
          repo: repo,
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
        const keyword = new RegExp(`${state.taskSearchKeyword}`, "i");
        const result = state.taskList.map((task) => {
          if (
            keyword.test(task.repo) ||
            keyword.test(task.title) ||
            keyword.test(task.body)
          ) {
            return { ...task, isSearchResult: true };
          } else {
            return { ...task, isSearchResult: false };
          }
        });
        state.taskList = result;
        state.isSearchMode = true;
      } else {
        state.isSearchMode = false;
      }
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
        state.errMsg = action.payload.errMsg;
        state.taskList.push(...(action.payload.issueData || []));
        state.page = state.page + action.payload.page;
        state.isAll = action.payload.isAll;
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
  resetTaskList,
} = taskListSlice.actions;

export default taskListSlice.reducer;
