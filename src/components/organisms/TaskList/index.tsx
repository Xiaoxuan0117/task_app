import classNames from "classnames";
import React from "react";
import { TaskListProps } from "../../../type";
import Loading from "../../atom/Loading";
import Task from "../../molecule/Task";

import "./style.scss";

export default function TaskList(props: TaskListProps): JSX.Element {
  const { taskList, isLoading } = props;
  return (
    <div className="taskList-wrapper">
      <div
        className={`taskList ${classNames(
          taskList.length !== 0 && "has-data"
        )}`}
      >
        {typeof taskList !== "string" &&
          taskList.map((task, index) => (
            <Task key={`task-${index}`} {...task}></Task>
          ))}
      </div>
      {isLoading === true && <Loading />}
    </div>
  );
}
