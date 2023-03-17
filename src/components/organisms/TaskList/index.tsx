import React from "react";
import { TaskProps } from "../../../type";
import Task from "../../molecule/Task";

import "./style.scss";

type TaskListProps = {
  tasksData?: TaskProps[];
};

export default function TaskList(props: TaskListProps): JSX.Element {
  const { tasksData } = props;
  return (
    <div className="taskList">
      {tasksData &&
        tasksData.map((task, index) => (
          <Task key={`task-${index}`} {...task}></Task>
        ))}
    </div>
  );
}
