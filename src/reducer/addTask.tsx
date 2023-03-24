import { createSlice } from "@reduxjs/toolkit";
import { AddTaskState } from "../type";

const initialState: AddTaskState = {
  title: "",
  repo: "",
  body: "",
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
    setAddTitle(state, action) {
      state.title = action.payload;
    },
    setAddBody(state, action) {
      state.body = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { selectRepo, setAddTitle, setAddBody } = addTaskSlice.actions;

export default addTaskSlice.reducer;
