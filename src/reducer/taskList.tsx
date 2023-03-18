import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { TaskListProps, TaskProps } from "../type";
import axios from "axios";

const initialState: TaskListProps = {
  isLoading: false,
  taskList: [],
};

export const fetchTaskList = createAsyncThunk("taskList/getIssue", async () => {
  console.log("into fetch");
  const getTaskList = axios({
    url: "/api/taskList",
    method: "get",
  });

  try {
    const resData = await getTaskList;
    console.log(resData);
    const issueDate: TaskProps[] = resData.data.map(
      (issue: {
        assignee: { avatar_url: string; html_url: string };
        created_at: string;
        html_url: string;
        id: string;
        labels: any[];
        number: number;
        repository: { name: string };
        repository_url: string;
        state: string;
        title: string;
        user: { login: string; html_url: string };
      }) => {
        const {
          assignee: { avatar_url, html_url: assigneeUrl },
          created_at,
          html_url,
          id,
          labels,
          number,
          repository: { name: repository_name },
          repository_url,
          state,
          title,
          user: { login, html_url: creatorUrl },
        } = issue;
        const labelsArr = labels.map((label) => label.name);
        return {
          assigneeAvatar: avatar_url,
          assigneeUrl: assigneeUrl,
          time: created_at,
          issueUrl: html_url,
          id,
          labels: labelsArr,
          number,
          repo: repository_name,
          repoUrl: repository_url,
          isOpen: state === "open" ? true : false,
          issue: title,
          creator: login,
          creatorUrl,
        };
      }
    );
    return issueDate;
  } catch (err) {
    console.log("err", err);
    return "error";
  }
});

export const counterSlice = createSlice({
  name: "taskList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTaskList.pending, (state, action) => {
        state.isLoading = true;
        return state;
      })
      .addCase(fetchTaskList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.taskList = action.payload;
        return state;
      });
  },
});

export default counterSlice.reducer;
