import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import Order from ".";

export default {
  title: "Molecule/Order",
  component: Order,
} as ComponentMeta<typeof Order>;

export const Primary: ComponentStory<typeof Order> = () => <Order></Order>;
