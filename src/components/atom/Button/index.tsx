import React from "react";
import { useNavigate } from "react-router-dom";
import { PostTask } from "../../../reducer/addTask";
import { taskSearch } from "../../../reducer/taskList";
import { useAppDispatch } from "../../../store";

import "./style.scss";

type ButtonProps = {
  children: JSX.Element;
  class?: string;
  type?: string;
};

export default function Button(props: ButtonProps): JSX.Element {
  const { children, class: buttonClass, type } = props;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const clickEvent = (type: string) => {
    switch (type) {
      case "cancel":
        return navigate(-1);
      case "update":
        return dispatch(PostTask());
      case "taskSearch":
        return dispatch(taskSearch());
      case "openAddModal":
        return navigate("add", { replace: false });
      default:
        return;
    }
  };
  return type ? (
    <button
      className={`button ${buttonClass}`}
      onClick={(e) => {
        e.preventDefault();
        clickEvent(type || "");
      }}
    >
      {children}
    </button>
  ) : (
    <button className={`button ${buttonClass}`}>{children}</button>
  );
}
