import React from "react";
import { useAppDispatch } from "../../../store";
import { setIssueSearchKeyword } from "../../../reducer/issueList";
import { setAddTitle } from "../../../reducer/addIssue";
import { setEditTitle } from "../../../reducer/editIssue";

import "./style.scss";

type InputProps = {
  class?: string;
  label?: string;
  input?: string;
  placeholder?: string;
  type: string;
};

export default function Input(props: InputProps): JSX.Element {
  const { type } = props;
  const dispatch = useAppDispatch();

  const clickEvent = (type: string, e: string) => {
    switch (type) {
      case "searchIssue":
        return dispatch(setIssueSearchKeyword(e));
      case "addTitle":
        return dispatch(setAddTitle(e));
      case "editTitle":
        return dispatch(setEditTitle(e));
      default:
        return;
    }
  };
  return (
    <input
      className={props.class}
      value={props.input}
      placeholder={props.placeholder}
      onChange={(e) => clickEvent(type, e.target.value)}
    ></input>
  );
}
