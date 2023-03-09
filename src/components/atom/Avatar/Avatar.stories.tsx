import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import Avatar from ".";
import avatar from "../../../assets/avatar.png";

export default {
  title: "Avatar",
  component: Avatar,
} as ComponentMeta<typeof Avatar>;

export const Primary: ComponentStory<typeof Avatar> = () => (
  <Avatar
    image={avatar}
    class="profile"
    href="https://github.com/Xiaoxuan0117"
  />
);

export const Small: ComponentStory<typeof Avatar> = () => (
  <Avatar
    image={avatar}
    class="member"
    href="https://github.com/Xiaoxuan0117"
  />
);
