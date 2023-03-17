import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import Task from ".";

export default {
  title: "Molecule/Task",
  component: Task,
} as ComponentMeta<typeof Task>;

const data = {
  isOpen: false,
  repo: "username/repo",
  repo_url: "https://github.com/xiaoxuan0117/task_app",
  issue: "issue 1",
  issue_url: "https://github.com/xiaoxuan0117/task_app/issues",
  labels: ["Bug", "In Progress"],
  time: "2023-03-08T05:47:16Z",
  creator: "username",
  creator_url: "https://github.com/Xiaoxuan0117",
  assignee_url: "https://github.com/Xiaoxuan0117",
  number: 5,
};

export const Primary: ComponentStory<typeof Task> = () => (
  <Task {...data}></Task>
);
