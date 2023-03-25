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
    name: "user1",
    repoOwner: "xiaoxuan0117",
  },
  {
    id: 2,
    name: "user2",
    repoOwner: "xiaoxuan0117",
  },
  {
    id: 3,
    name: "user3",
    repoOwner: "xiaoxuan0117",
  },
  {
    id: 4,
    name: "user4",
    repoOwner: "xiaoxuan0117",
  },
  {
    id: 5,
    name: "user5",
    repoOwner: "xiaoxuan0117",
  },
  {
    id: 6,
    name: "user6",
    repoOwner: "xiaoxuan0117",
  },
];

export const TaskListRepo: ComponentStory<typeof Navi> = () => (
  <Navi repoOptions={dummyData}></Navi>
);
