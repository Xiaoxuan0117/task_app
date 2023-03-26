import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import Welcome from ".";

export default {
  title: "Atom/Welcome",
  component: Welcome,
} as ComponentMeta<typeof Welcome>;

export const Primary: ComponentStory<typeof Welcome> = () => (
  <Welcome></Welcome>
);
