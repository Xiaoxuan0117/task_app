import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import MarkdownEditor from ".";

export default {
  title: "Atom/MarkdownEditor",
  component: MarkdownEditor,
} as ComponentMeta<typeof MarkdownEditor>;

export const Primary: ComponentStory<typeof MarkdownEditor> = () => (
  <MarkdownEditor type="" body="" />
);
