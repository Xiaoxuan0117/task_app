import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import Loading from ".";

export default {
  title: "Atom/Loading",
  component: Loading,
} as ComponentMeta<typeof Loading>;

export const Primary: ComponentStory<typeof Loading> = () => (
  <Loading></Loading>
);
