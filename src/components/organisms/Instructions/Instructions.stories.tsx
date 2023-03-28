import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import Instructions from ".";

export default {
  title: "Atom/Instructions",
  component: Instructions,
} as ComponentMeta<typeof Instructions>;

export const Primary: ComponentStory<typeof Instructions> = () => (
  <Instructions></Instructions>
);
