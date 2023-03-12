import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import Dropdown from ".";

export default {
  title: "Atom/Dropdown",
  component: Dropdown,
} as ComponentMeta<typeof Dropdown>;

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
const dammyData_empty: any[] = [];

export const Primary: ComponentStory<typeof Dropdown> = () => (
  <Dropdown
    class="row"
    inputStyle="large"
    title="Repository"
    options={dammyData_empty}
  ></Dropdown>
);

export const Secondary: ComponentStory<typeof Dropdown> = () => (
  <Dropdown
    class="column"
    inputStyle="small"
    title="Assignee"
    options={dammyData}
  ></Dropdown>
);
