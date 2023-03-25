import classNames from "classnames";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { TriggerGetTaskList } from "../../../reducer/taskList";
import { RootState, useAppDispatch } from "../../../store";
import { TaskListProps } from "../../../type";
import ErrorMessage from "../../atom/ErrorMessage";
import Loading from "../../atom/Loading";
import Task from "../../molecule/Task";

import "./style.scss";

export default function TaskList(props: TaskListProps): JSX.Element {
  const { taskList, isLoading, errMsg } = props;
  const { isSearchMode } = useSelector((state: RootState) => state.taskList);
  const dispatch = useAppDispatch();

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

  useEffect(() => {
    if (taskList.length !== 0) {
      const taskListElm = document.getElementById("taskList-wrapper");
      const taskListBottomOffset =
        (taskListElm?.offsetHeight || 0) + (taskListElm?.offsetTop || 0);
      const innerHeight = window.innerHeight || 0;
      if (taskListBottomOffset < innerHeight) {
        dispatch(TriggerGetTaskList());
      }
    }
  });
  return (
    <div id="taskList-wrapper" className="taskList-wrapper">
      {errMsg && <ErrorMessage text={errMsg} />}
      <div
        className={`taskList ${classNames(
          taskListArr().length !== 0 && "has-data"
        )}`}
      >
        {taskListArr() &&
          taskListArr().map((task) => <Task key={task.id} {...task}></Task>)}
      </div>
      {isLoading && <Loading text="Loading" />}
    </div>
  );
}
