import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import Navi from ".";

export default {
  title: "Molecule/Navi",
  component: Navi,
} as ComponentMeta<typeof Navi>;

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

export const IssueListRepo: ComponentStory<typeof Navi> = () => (
  <Navi repoOptions={dummyData}></Navi>
);
