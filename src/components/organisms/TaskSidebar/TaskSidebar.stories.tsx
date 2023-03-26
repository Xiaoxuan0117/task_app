import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import TaskSidebar from ".";

export default {
  title: "Organisms/TaskSidebar",
  component: TaskSidebar,
} as ComponentMeta<typeof TaskSidebar>;

export const Primary: ComponentStory<typeof TaskSidebar> = () => (
  <TaskSidebar
    isOpen={false}
    labels={["ToDo", "Bug"]}
    milestone={"new milestone"}
    milestone_url="https://github.com/xiaoxuan0117/task_app/milestone/1"
    taskInfo={{
      owner: "",
      repo: "",
      number: 0,
    }}
    assignees={[]}
  ></TaskSidebar>
);
