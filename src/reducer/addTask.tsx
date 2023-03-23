import { createSlice } from "@reduxjs/toolkit";
import { AddTaskState } from "../type";

const initialState: AddTaskState = {
  title: "",
  repository: "",
  content: "",
  isUploading: false,
  isSuccess: false,
};

export const addTaskSlice = createSlice({
  name: "addTask",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default addTaskSlice.reducer;
