import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import Login from ".";

export default {
  title: "Molecule/Login",
  component: Login,
} as ComponentMeta<typeof Login>;

export const Primary: ComponentStory<typeof Login> = () => <Login></Login>;
