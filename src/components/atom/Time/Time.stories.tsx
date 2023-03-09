import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import Time from ".";

export default {
  title: "Time",
  component: Time,
} as ComponentMeta<typeof Time>;

export const Bug: ComponentStory<typeof Time> = () => (
  <Time utcTime="2023-03-08T05:47:16Z" />
);
