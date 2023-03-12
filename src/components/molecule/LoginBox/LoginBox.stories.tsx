import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import LoginBox from ".";

export default {
  title: "Molecule/LoginBox",
  component: LoginBox,
} as ComponentMeta<typeof LoginBox>;

export const Primary: ComponentStory<typeof LoginBox> = () => (
  <LoginBox></LoginBox>
);
