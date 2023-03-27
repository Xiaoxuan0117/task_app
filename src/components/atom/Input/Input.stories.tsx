import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import Input from ".";

export default {
  title: "Atom/Input",
  component: Input,
} as ComponentMeta<typeof Input>;

export const Primary: ComponentStory<typeof Input> = () => (
  <Input class="login" type="default"></Input>
);

export const Secondary: ComponentStory<typeof Input> = () => (
  <Input type="default"></Input>
);
