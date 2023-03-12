import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import Tag from ".";

export default {
  title: "Atom/Tag",
  component: Tag,
} as ComponentMeta<typeof Tag>;

export const Bug: ComponentStory<typeof Tag> = () => <Tag>Bug</Tag>;

export const ToDo: ComponentStory<typeof Tag> = () => <Tag>ToDo</Tag>;

export const InProgress: ComponentStory<typeof Tag> = () => (
  <Tag>In Progress</Tag>
);

export const Done: ComponentStory<typeof Tag> = () => <Tag>Done</Tag>;
