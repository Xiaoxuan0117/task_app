import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import RadioButton from ".";

export default {
  title: "Atom/RadioButton",
  component: RadioButton,
} as ComponentMeta<typeof RadioButton>;

const dummyData_two = ["Open", "Closed"];
const dummyData_three = ["ToDo", "In Progress", "Done"];
const dummyData_three2 = ["Created", "Assigned", "Mentioned"];

export const Two: ComponentStory<typeof RadioButton> = () => (
  <RadioButton
    type={{ clickType: "filter", queryParam: "category" }}
    options={dummyData_two}
  ></RadioButton>
);

export const Three: ComponentStory<typeof RadioButton> = () => (
  <RadioButton
    type={{ clickType: "filter", queryParam: "category" }}
    options={dummyData_three}
  ></RadioButton>
);

export const Three2: ComponentStory<typeof RadioButton> = () => (
  <RadioButton
    type={{ clickType: "filter", queryParam: "category" }}
    options={dummyData_three2}
  ></RadioButton>
);
