import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import Button from "../Button";
import searchButton from "../../../assets/searchButton.svg";
import editButton from "../../../assets/editButton.svg";
import editButton2 from "../../../assets/editButton2.svg";
import closeButton from "../../../assets/closeButton.svg";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Atom/Button",
  component: Button,
} as ComponentMeta<typeof Button>;

export const Primary: ComponentStory<typeof Button> = () => (
  <Button class="primary">
    <div>Add</div>
  </Button>
);

export const Disabled: ComponentStory<typeof Button> = () => (
  <Button class="disabled">
    <div>Add</div>
  </Button>
);

export const Search: ComponentStory<typeof Button> = () => (
  <Button class="search">
    <img src={searchButton} alt="searchButton" />
  </Button>
);

export const Edit: ComponentStory<typeof Button> = () => (
  <Button class="edit">
    <img src={editButton} alt="editButton" />
  </Button>
);

export const Edit2: ComponentStory<typeof Button> = () => (
  <Button class="edit">
    <img src={editButton2} alt="editButton" />
  </Button>
);

export const Close: ComponentStory<typeof Button> = () => (
  <Button class="close">
    <img src={closeButton} alt="closeButton" />
  </Button>
);
