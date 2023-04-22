import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IssueProps,
  IssueListState,
  GetIssueListPayload,
  GetIssueListParams,
  GetIssueListResData,
  UpdateStatePayload,
  IssueRequiredInfo,
  UserState,
} from "../type";
import axios from "axios";
import { AppDispatch } from "../store";
import { resetAddIssue } from "./addIssue";

const initialState: IssueListState = {
  isLoading: false,
  issueList: [],
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
  issueSearchKeyword: "",
  isSearchMode: false,
  isFilterOpen: false,
};

export const TriggerGetIssueList = createAsyncThunk<
  boolean,
  { signal?: AbortSignal; firstTime: boolean },
  {
    dispatch: AppDispatch;
    state: {
      issueList: IssueListState;
    };
  }
>(
  "issueList/TriggerGetIssueList",
  async ({ signal, firstTime }, { getState, dispatch }) => {
    const { isAll, isLoading } = getState().issueList;
    if (!isAll && !isLoading) {
      if (firstTime) {
        await dispatch(GetIssueList({ reLoad: true, signal: signal }));
      } else {
        await dispatch(GetIssueList({ reLoad: false, signal: signal }));
      }
    }
    return true;
  }
);

export const GetIssueList = createAsyncThunk<
  GetIssueListPayload,
  GetIssueListParams,
  {
    dispatch: AppDispatch;
    state: {
      issueList: IssueListState;
      user: UserState;
    };
  }
>(
  "issueList/GetIssueList",
  async ({ reLoad, signal }, { dispatch, getState, rejectWithValue }) => {
    const {
      issueList: {
        page,
        filter: { state, labels, category, direction },
        isSearchMode,
        issueSearchKeyword,
        showRepo: { repoOwner, repoName },
      },
      user: { name, token },
    } = getState();

    if (!token) {
      return rejectWithValue("No token");
    }

    if (reLoad) {
      dispatch(resetIssueList());
      dispatch(resetAddIssue());
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
      if (issueSearchKeyword.indexOf("label:") !== -1) {
        keyword = issueSearchKeyword.slice(
          0,
          issueSearchKeyword.indexOf("label:")
        );
        labelQuery = issueSearchKeyword.slice(
          issueSearchKeyword.indexOf("label:"),
          issueSearchKeyword.length
        );
      } else {
        keyword = issueSearchKeyword;
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

      try {
        const resResult = await axios.get("/api/issueSearch", {
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
        dispatch(setErrorStatusIssueList(status));
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
          url: "/api/issueList/",
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
        dispatch(setErrorStatusIssueList(status));
        return `status: ${status} / error message: ${message}`;
      }
    };

    if (isSearchMode) {
      resData = await search();
    } else {
      resData = await list();
    }

    if (typeof resData === "string") {
      return rejectWithValue(resData);
    }
    const issueData: IssueProps[] = resData.map(
      (issue: GetIssueListResData) => {
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
      }
    );

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
    state: { issueList: { isLoading: boolean } };
  }
>("issueList/setFilter", async ({ type, option }, { dispatch, getState }) => {
  const { isLoading } = getState().issueList;

  if (!isLoading) {
    dispatch(changeFilterState({ type, option }));
    await dispatch(GetIssueList({ reLoad: true }));
  }
  return true;
});

export const UpdateState = createAsyncThunk<
  UpdateStatePayload,
  IssueRequiredInfo,
  {
    dispatch: AppDispatch;
    state: { issueList: { issueList: IssueProps[] } };
  }
>(
  "issue/updateState",
  async (
    { repoOwner, repoName, number },
    { dispatch, getState, rejectWithValue }
  ) => {
    const { issueList } = getState().issueList;

    const issueIndex = issueList.findIndex((issue) => {
      return (
        issue.repoOwner === repoOwner &&
        issue.repoName === repoName &&
        issue.number === number
      );
    });
    if (issueIndex === -1) {
      return rejectWithValue("Cannot find the issue");
    }
    const currentState = issueList[issueIndex].isOpen;

    try {
      const resData = await axios.get("/api/updateState", {
        params: {
          owner: repoOwner,
          repo: repoName,
          issue_number: number,
          state: !currentState ? "open" : "closed",
        },
      });

      return { issueIndex, state: resData.data === "open" ? true : false };
    } catch (err: any) {
      const {
        response: {
          status,
          data: { message },
        },
      } = err;
      dispatch(setErrorStatusIssueList(status));
      return rejectWithValue(`status: ${status} / error message: ${message}`);
    }
  }
);

export const issueListSlice = createSlice({
  name: "issueList",
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
    setIssueSearchKeyword(state, action: PayloadAction<string>) {
      state.issueSearchKeyword = action.payload;
    },
    issueSearch(state) {
      if (state.issueSearchKeyword) {
        state.isSearchMode = true;
      } else {
        state.isSearchMode = false;
      }
    },
    toggleFilter(state) {
      state.isFilterOpen = !state.isFilterOpen;
    },
    setErrorStatusIssueList(state, action) {
      state.errStatus = action.payload;
    },
    resetIssueList(state) {
      state = {
        ...initialState,
        showRepo: state.showRepo,
      };
      return;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetIssueList.pending, (state, action) => {
        state.isLoading = true;
        if (action.meta.arg.reLoad) {
          state.issueList = [];
          state.page = 1;
          state.isAll = false;
        }
        return state;
      })
      .addCase(GetIssueList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.issueList.push(...(action.payload.issueData || []));
        state.page = state.page + action.payload.page;
        state.isAll = action.payload.isAll;
        state.errMsg = "";
        return state;
      })
      .addCase(GetIssueList.rejected, (state, action) => {
        state.isLoading = false;
        state.errMsg = `sorry! something went wrong! ${action.payload} ${
          action.error.message && action.error.message
        }`;
        state.issueList = [];
        state.page = 1;
        state.isAll = false;
        return state;
      })
      .addCase(TriggerGetIssueList.pending, (state, action) => {
        if (action.meta.arg.firstTime) {
          state.isAll = false;
        }
        return state;
      })
      .addCase(TriggerGetIssueList.fulfilled, (state, action) => {
        return state;
      })
      .addCase(setFilter.pending, (state) => {
        state.issueSearchKeyword = "";
        state.isSearchMode = false;
      })
      .addCase(UpdateState.pending, (state, action) => {
        state.isStateLoading = true;
      })
      .addCase(UpdateState.fulfilled, (state, action) => {
        state.isStateLoading = false;
        state.issueList[action.payload.issueIndex].isOpen =
          action.payload.state;
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
  setIssueSearchKeyword,
  issueSearch,
  toggleFilter,
  resetIssueList,
  setErrorStatusIssueList,
} = issueListSlice.actions;

export default issueListSlice.reducer;
