import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import Issue from ".";

export default {
  title: "Molecule/Issue",
  component: Issue,
} as ComponentMeta<typeof Issue>;

const data = {
  isOpen: false,
  repoName: "username/repo",
  repoUrl: "https://github.com/xiaoxuan0117/issue_app",
  repoOwner: "xiaoxuan0117",
  title: "issue 1",
  issueUrl: "https://github.com/xiaoxuan0117/issue_app/issues",
  labels: ["Bug", "In Progress"],
  time: "2023-03-08T05:47:16Z",
  creator: "username",
  creatorUrl: "https://github.com/Xiaoxuan0117",
  assigneeUrl: "https://github.com/Xiaoxuan0117",
  number: 5,
  body: "no description provided",
  isSearchResult: false,
};

export const Primary: ComponentStory<typeof Issue> = () => (
  <Issue {...data}></Issue>
);
