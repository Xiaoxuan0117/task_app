import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import Input from ".";

export default {
  title: "Input",
  component: Input,
} as ComponentMeta<typeof Input>;

export const Primary: ComponentStory<typeof Input> = () => (
  <Input class="login"></Input>
);

export const Secondary: ComponentStory<typeof Input> = () => <Input></Input>;
