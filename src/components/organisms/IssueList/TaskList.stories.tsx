import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import IssueList from ".";

export default {
  title: "Organisms/IssueList",
  component: IssueList,
} as ComponentMeta<typeof IssueList>;

const issuesDate = [
  {
    isOpen: false,
    repoName: "username/repo",
    repoUrl: "https://github.com/xiaoxuan0117/issue_app",
    repoOwner: "xiaoxuan0117",
    title: "issue 1",
    issueUrl: "https://github.com/xiaoxuan0117/issue_app/issues",
    labels: ["Bug", "ToDo"],
    time: "2023-03-08T05:47:16Z",
    creator: "username",
    creatorUrl: "https://github.com/Xiaoxuan0117",
    assigneeUrl: "https://github.com/Xiaoxuan0117",
    number: 5,
    body: "no description provided",
    isSearchResult: false,
  },
  {
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
  },
  {
    isOpen: false,
    repoName: "username/repo",
    repoUrl: "https://github.com/xiaoxuan0117/issue_app",
    repoOwner: "xiaoxuan0117",
    title: "issue 1",
    issueUrl: "https://github.com/xiaoxuan0117/issue_app/issues",
    labels: ["Bug", "Done"],
    time: "2023-03-08T05:47:16Z",
    creator: "username",
    creatorUrl: "https://github.com/Xiaoxuan0117",
    assigneeUrl: "https://github.com/Xiaoxuan0117",
    number: 5,
    body: "no description provided",
    isSearchResult: false,
  },
];

export const Primary: ComponentStory<typeof IssueList> = () => (
  <IssueList
    isLoading={true}
    issueList={issuesDate}
    errMsg="wrong!"
    errStatus={404}
  ></IssueList>
);
