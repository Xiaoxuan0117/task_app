import classNames from "classnames";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../../store";
import { TaskListProps } from "../../../type";
import Loading from "../../atom/Loading";
import Task from "../../molecule/Task";

import "./style.scss";

export default function TaskList(props: TaskListProps): JSX.Element {
  const { taskList, isLoading, errMsg } = props;
  const { isSearchMode } = useSelector((state: RootState) => state.taskList);

  const taskListArr = () => {
    if (taskList) {
      if (isSearchMode) {
        return taskList.filter((task) => task.isSearchResult === true);
      } else {
        return taskList;
      }
    }
    return [];
  };

  // useEffect(() => {
  //   console.log("task render");
  //   const taskList = document.getElementById("")
  // });
  return (
    <div className="taskList-wrapper">
      {errMsg && (
        <div className="err">
          {errMsg}
          <Link to="/login">redirect to login page and try again{" :))"}</Link>
        </div>
      )}
      <div
        className={`taskList ${classNames(
          taskListArr().length !== 0 && "has-data"
        )}`}
      >
        {taskListArr() &&
          taskListArr().map((task) => <Task key={task.id} {...task}></Task>)}
      </div>
      {isLoading === true && <Loading />}
    </div>
  );
}
