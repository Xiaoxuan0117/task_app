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
const dammyData_empty: any[] = [];

export const Primary: ComponentStory<typeof Dropdown> = () => (
  <Dropdown
    class="row"
    inputStyle="large"
    title="Repository"
    options={dammyData_empty}
    type="select"
  ></Dropdown>
);

export const Secondary: ComponentStory<typeof Dropdown> = () => (
  <Dropdown
    class="column"
    inputStyle="small"
    title="Assignee"
    options={dummyData}
    type="select"
  ></Dropdown>
);
