import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import RadioButton from ".";

export default {
  title: "Atom/RadioButton",
  component: RadioButton,
} as ComponentMeta<typeof RadioButton>;

const dammyData_two = ["Open", "Closed"];
const dammyData_three = ["ToDo", "In Progress", "Done"];
const dammyData_three2 = ["Created", "Assigned", "Mentioned"];

export const Two: ComponentStory<typeof RadioButton> = () => (
  <RadioButton
    type={{ clickType: "filter", queryParam: "category" }}
    options={dammyData_two}
  ></RadioButton>
);

export const Three: ComponentStory<typeof RadioButton> = () => (
  <RadioButton
    type={{ clickType: "filter", queryParam: "category" }}
    options={dammyData_three}
  ></RadioButton>
);

export const Three2: ComponentStory<typeof RadioButton> = () => (
  <RadioButton
    type={{ clickType: "filter", queryParam: "category" }}
    options={dammyData_three2}
  ></RadioButton>
);
