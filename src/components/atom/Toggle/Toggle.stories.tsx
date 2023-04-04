import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import Toggle from ".";

export default {
  title: "Atom/Toggle",
  component: Toggle,
} as ComponentMeta<typeof Toggle>;

export const Primary: ComponentStory<typeof Toggle> = () => (
  <Toggle isOpen={true} />
);
