import { createSlice } from "@reduxjs/toolkit";
import { TaskDetailState } from "../type";

const initialState: TaskDetailState = {
  assigneeAvatar: "",
  assigneeUrl: "",
  body: "",
  time: "",
  issueUrl: "",
  id: "",
  number: 0,
  repo: "",
  repoUrl: "",
  isOpen: true,
  title: "",
  creator: "",
  creatorUrl: "",
  isSearchResult: false,
  labels: [],
  commentsData: [],
  milestone: "",
  milestoneUrl: "",
};

export const taskDetailSlice = createSlice({
  name: "taskDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});
