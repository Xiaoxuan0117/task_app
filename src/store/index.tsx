import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import taskListReducer from "../reducer/taskList";
import taskDetailReducer from "../reducer/taskDetail";
import addTaskReducer from "../reducer/addTask";
import userReducer from "../reducer/user";

export const store = configureStore({
  reducer: {
    taskList: taskListReducer,
    taskDetail: taskDetailReducer,
    addTask: addTaskReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
