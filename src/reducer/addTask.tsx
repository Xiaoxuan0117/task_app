import { createSlice } from "@reduxjs/toolkit";
import { AddTaskState } from "../type";

const initialState: AddTaskState = {
  title: "",
  repo: "",
  content: "",
  isUploading: false,
  isSuccess: false,
};

export const addTaskSlice = createSlice({
  name: "addTask",
  initialState,
  reducers: {
    selectRepo(state, action) {
      state.repo = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { selectRepo } = addTaskSlice.actions;

export default addTaskSlice.reducer;
