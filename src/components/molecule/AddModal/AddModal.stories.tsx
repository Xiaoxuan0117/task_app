import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import AddModal from ".";

export default {
  title: "Molecule/AddModal",
  component: AddModal,
} as ComponentMeta<typeof AddModal>;

export const Primary: ComponentStory<typeof AddModal> = () => <AddModal />;
