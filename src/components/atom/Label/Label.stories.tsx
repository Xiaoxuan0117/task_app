import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import Label from ".";

export default {
  title: "Atom/Label",
  component: Label,
} as ComponentMeta<typeof Label>;

export const Bug: ComponentStory<typeof Label> = () => <Label>Bug</Label>;

export const ToDo: ComponentStory<typeof Label> = () => <Label>ToDo</Label>;

export const InProgress: ComponentStory<typeof Label> = () => (
  <Label>In Progress</Label>
);

export const Done: ComponentStory<typeof Label> = () => <Label>Done</Label>;
