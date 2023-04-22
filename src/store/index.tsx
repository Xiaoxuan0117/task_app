import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import issueListReducer from "../reducer/issueList";
import issueDetailReducer from "../reducer/issueDetail";
import addIssueReducer from "../reducer/addIssue";
import editIssueReducer from "../reducer/editIssue";
import userReducer from "../reducer/user";

export const store = configureStore({
  reducer: {
    issueList: issueListReducer,
    issueDetail: issueDetailReducer,
    addIssue: addIssueReducer,
    editIssue: editIssueReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
