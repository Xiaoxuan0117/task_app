import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import taskListReducer from "../reducer/taskList";
import taskDetailReducer from "../reducer/taskDetail";

export const store = configureStore({
  reducer: {
    taskList: taskListReducer,
    taskDetail: taskDetailReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
