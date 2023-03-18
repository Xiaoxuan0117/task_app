import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import taskListReducer from "../reducer/taskList";

export const store = configureStore({
  reducer: {
    taskList: taskListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
