import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import Input from ".";
import { setTaskSearchKeyword } from "../../../reducer/taskList";

export default {
  title: "Atom/Input",
  component: Input,
} as ComponentMeta<typeof Input>;

export const Primary: ComponentStory<typeof Input> = () => (
  <Input class="login" changeEvent={setTaskSearchKeyword}></Input>
);

export const Secondary: ComponentStory<typeof Input> = () => (
  <Input changeEvent={setTaskSearchKeyword}></Input>
);
