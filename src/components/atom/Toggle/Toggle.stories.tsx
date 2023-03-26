import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import Toggle from ".";

export default {
  title: "Atom/Toggle",
  component: Toggle,
} as ComponentMeta<typeof Toggle>;

const dummyTaskInfo = {
  owner: "creator",
  repo: "repo",
  number: 0,
};

export const Primary: ComponentStory<typeof Toggle> = () => (
  <Toggle isOpen={true} taskInfo={dummyTaskInfo} type="taskDetail" />
);
