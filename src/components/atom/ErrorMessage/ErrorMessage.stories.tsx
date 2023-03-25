import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import ErrorMessage from ".";

export default {
  title: "Atom/ErrorMessage",
  component: ErrorMessage,
} as ComponentMeta<typeof ErrorMessage>;

export const Primary: ComponentStory<typeof ErrorMessage> = () => (
  <ErrorMessage text="new Task uploaded successfully!!"></ErrorMessage>
);
