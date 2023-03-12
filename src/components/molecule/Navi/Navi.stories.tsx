import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import Navi from ".";

export default {
  title: "Molecule/Navi",
  component: Navi,
} as ComponentMeta<typeof Navi>;

const dammyData = [
  "user1",
  "user2",
  "user3",
  "user4",
  "user5",
  "user6",
  "user7",
  "user7",
  "user8",
];

export const TaskListRepo: ComponentStory<typeof Navi> = () => (
  <Navi repoOptions={dammyData}></Navi>
);
