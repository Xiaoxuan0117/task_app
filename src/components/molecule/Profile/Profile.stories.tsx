import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import Profile from ".";

export default {
  title: "Molecule/Profile",
  component: Profile,
} as ComponentMeta<typeof Profile>;

export const Primary: ComponentStory<typeof Profile> = () => (
  <Profile></Profile>
);
