import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import cookie from "js-cookie";
import { useAppDispatch } from "../../../store";
import { PostTask } from "../../../reducer/addTask";
import { UpdateTask } from "../../../reducer/editTask";
import { GetTaskDetail, toggleDetail } from "../../../reducer/taskDetail";
import {
  GetTaskList,
  taskSearch,
  toggleFilter,
} from "../../../reducer/taskList";

import "./style.scss";

type ButtonProps = {
  children: JSX.Element;
  class?: string;
  type?: string;
};

export default function Button(props: ButtonProps): JSX.Element {
  const { children, class: buttonClass, type } = props;
  const navigate = useNavigate();
  let { repoOwner, repoName, number } = useParams();
  const dispatch = useAppDispatch();

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
              repoOwner: repoOwner || "",
              repoName: repoName || "",
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
      case "toggleDetail":
        return dispatch(toggleDetail());
      case "logout":
        return (function () {
          cookie.remove("access_token");
          window.location.href = "/";
        })();
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
