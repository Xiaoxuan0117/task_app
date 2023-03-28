import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import Comment from ".";

export default {
  title: "Molecule/Comment",
  component: Comment,
} as ComponentMeta<typeof Comment>;

const body =
  "# A demo of `react-markdown`\r\n\r\n`react-markdown` is a markdown component for React.\r\n\r\n👉 Changes are re-rendered as you type.\r\n\r\n👈 Try writing some markdown on the left.\r\n\r\n## Overview\r\n\r\n* Follows [CommonMark](https://commonmark.org)\r\n* Optionally follows [GitHub Flavored Markdown](https://github.github.com/gfm/)\r\n* Renders actual React elements instead of using `dangerouslySetInnerHTML`\r\n* Lets you define your own components (to render `MyHeading` instead of `h1`)\r\n* Has a lot of plugins";

export const Primary: ComponentStory<typeof Comment> = () => (
  <Comment
    id={123321}
    username="username"
    user_url="https://github.com/Xiaoxuan0117"
    created_at="2023-03-08T05:47:16Z"
    allowEdit={true}
    isBody={true}
  >
    {body}
  </Comment>
);
