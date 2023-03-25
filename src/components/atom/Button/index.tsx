import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PostTask } from "../../../reducer/addTask";
import { UpdateTask } from "../../../reducer/editTask";
import { GetTaskDetail } from "../../../reducer/taskDetail";
import {
  GetTaskList,
  taskSearch,
  toggleFilter,
} from "../../../reducer/taskList";
import { useAppDispatch } from "../../../store";

import "./style.scss";

type ButtonProps = {
  children: JSX.Element;
  class?: string;
  type?: string;
};

export default function Button(props: ButtonProps): JSX.Element {
  let { repoOwner, repo, number } = useParams();
  const { children, class: buttonClass, type } = props;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const clickEvent = (type: string) => {
    switch (type) {
      case "cancel":
        return navigate(-1);
      case "addCloseRefresh":
        return (async function () {
          navigate(-1);
          dispatch(GetTaskList({ reLoad: true }));
        })();
      case "editCloseRefresh":
        return (async function () {
          navigate(-1);
          dispatch(
            GetTaskDetail({
              owner: repoOwner || "",
              repo: repo || "",
              number: parseInt(number || "0"),
            })
          );
        })();
      case "add":
        return dispatch(PostTask());
      case "update":
        return dispatch(UpdateTask());
      case "taskSearch":
        return dispatch(taskSearch());
      case "openAddModal":
        return navigate("add", { replace: false });
      case "toggleFilter":
        return dispatch(toggleFilter());
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
