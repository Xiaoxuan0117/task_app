import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import Toggle from ".";

export default {
  title: "Toggle",
  component: Toggle,
} as ComponentMeta<typeof Toggle>;

export const Bug: ComponentStory<typeof Toggle> = () => <Toggle />;
