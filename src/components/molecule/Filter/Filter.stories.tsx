import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import Filter from ".";

export default {
  title: "Molecule/Filter",
  component: Filter,
} as ComponentMeta<typeof Filter>;

export const Primary: ComponentStory<typeof Filter> = () => <Filter></Filter>;
