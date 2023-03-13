import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import TaskDetail from ".";

export default {
  title: "Organisms/TaskDetail",
  component: TaskDetail,
} as ComponentMeta<typeof TaskDetail>;

export const Primary: ComponentStory<typeof TaskDetail> = () => (
  <TaskDetail
    isOpen={false}
    tags={["ToDo", "Bug"]}
    milestone={"new milestone"}
    milestone_url="https://github.com/xiaoxuan0117/task_app/milestone/1"
  ></TaskDetail>
);
