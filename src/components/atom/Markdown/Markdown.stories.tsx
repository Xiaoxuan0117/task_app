import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import Markdown from ".";

export default {
  title: "Markdown",
  component: Markdown,
} as ComponentMeta<typeof Markdown>;

export const Primary: ComponentStory<typeof Markdown> = () => <Markdown />;
