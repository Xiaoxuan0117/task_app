import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import Comment from ".";

export default {
  title: "Molecule/Comment",
  component: Comment,
} as ComponentMeta<typeof Comment>;

export const Primary: ComponentStory<typeof Comment> = () => <Comment />;
