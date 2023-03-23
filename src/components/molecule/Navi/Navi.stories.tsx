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
  },
  {
    id: 2,
    name: "user2",
  },
  {
    id: 3,
    name: "user3",
  },
  {
    id: 4,
    name: "user4",
  },
  {
    id: 5,
    name: "user5",
  },
  {
    id: 6,
    name: "user6",
  },
];

export const TaskListRepo: ComponentStory<typeof Navi> = () => (
  <Navi repoOptions={dummyData}></Navi>
);
