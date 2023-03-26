import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import Dropdown from ".";

export default {
  title: "Atom/Dropdown",
  component: Dropdown,
} as ComponentMeta<typeof Dropdown>;

const dummyData = [
  {
    id: 1,
    repoName: "user1",
    repoOwner: "xiaoxuan0117",
  },
  {
    id: 2,
    repoName: "user2",
    repoOwner: "xiaoxuan0117",
  },
  {
    id: 3,
    repoName: "user3",
    repoOwner: "xiaoxuan0117",
  },
  {
    id: 4,
    repoName: "user4",
    repoOwner: "xiaoxuan0117",
  },
  {
    id: 5,
    repoName: "user5",
    repoOwner: "xiaoxuan0117",
  },
  {
    id: 6,
    repoName: "user6",
    repoOwner: "xiaoxuan0117",
  },
];
const dummyData_empty: any[] = [];

export const Primary: ComponentStory<typeof Dropdown> = () => (
  <Dropdown
    class="row"
    title="Repository"
    options={dummyData_empty}
    type="select"
  ></Dropdown>
);

export const Secondary: ComponentStory<typeof Dropdown> = () => (
  <Dropdown
    class="column"
    title="Assignee"
    options={dummyData}
    type="select"
  ></Dropdown>
);
