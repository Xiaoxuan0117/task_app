import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import MarkdownEditor from ".";

export default {
  title: "MarkdownEditor",
  component: MarkdownEditor,
} as ComponentMeta<typeof MarkdownEditor>;

export const Primary: ComponentStory<typeof MarkdownEditor> = () => (
  <MarkdownEditor />
);
