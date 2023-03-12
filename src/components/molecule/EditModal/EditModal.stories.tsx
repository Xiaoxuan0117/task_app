import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import EditModal from ".";

export default {
  title: "Molecule/EditModal",
  component: EditModal,
} as ComponentMeta<typeof EditModal>;

export const Primary: ComponentStory<typeof EditModal> = () => (
  <EditModal prevTitle={`issue`}></EditModal>
);
