import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import Controller from ".";

export default {
  title: "Organisms/Controller",
  component: Controller,
} as ComponentMeta<typeof Controller>;

export const Primary: ComponentStory<typeof Controller> = () => (
  <Controller></Controller>
);
