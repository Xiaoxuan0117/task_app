import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import TaskList from ".";

export default {
  title: "Organisms/TaskList",
  component: TaskList,
} as ComponentMeta<typeof TaskList>;

const tasksDate = [
  {
    isOpen: false,
    repo: "username/repo",
    repo_url: "https://github.com/xiaoxuan0117/task_app",
    issue: "issue 1",
    issue_url: "https://github.com/xiaoxuan0117/task_app/issues",
    labels: ["Bug", "ToDo"],
    time: "2023-03-08T05:47:16Z",
    creator: "username",
    creator_url: "https://github.com/Xiaoxuan0117",
    assignee_url: "https://github.com/Xiaoxuan0117",
  },
  {
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
  },
  {
    isOpen: false,
    repo: "username/repo",
    repo_url: "https://github.com/xiaoxuan0117/task_app",
    issue: "issue 1",
    issue_url: "https://github.com/xiaoxuan0117/task_app/issues",
    labels: ["Bug", "Done"],
    time: "2023-03-08T05:47:16Z",
    creator: "username",
    creator_url: "https://github.com/Xiaoxuan0117",
    assignee_url: "https://github.com/Xiaoxuan0117",
  },
];

export const Primary: ComponentStory<typeof TaskList> = () => (
  <TaskList tasksData={tasksDate}></TaskList>
);
