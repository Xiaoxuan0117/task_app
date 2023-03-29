import classNames from "classnames";
import React, { useEffect } from "react";
import { useAppDispatch } from "../../../store";
import { TaskListProps } from "../../../type";

import { TriggerGetTaskList } from "../../../reducer/taskList";
import ErrorMessage from "../../atom/ErrorMessage";
import Loading from "../../atom/Loading";
import Task from "../../molecule/Task";

import "./style.scss";

export default function TaskList(props: TaskListProps): JSX.Element {
  const { taskList, isLoading, errMsg, errStatus } = props;
  const dispatch = useAppDispatch();

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
      {errMsg && <ErrorMessage text={errMsg} errStatus={errStatus} />}
      <div className={`taskList ${classNames(taskList.length && "has-data")}`}>
        {taskList.length
          ? taskList.map((task) => <Task key={task.id} {...task}></Task>)
          : !isLoading && (
              <div className="empty">
                <i>no task</i>
              </div>
            )}
      </div>
      {isLoading && <Loading text="Loading" />}
    </div>
  );
}
