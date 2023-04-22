import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import UploadSuccess from ".";

export default {
  title: "Atom/UploadSuccess",
  component: UploadSuccess,
} as ComponentMeta<typeof UploadSuccess>;

export const Primary: ComponentStory<typeof UploadSuccess> = () => (
  <UploadSuccess text="new Issue uploaded successfully!!"></UploadSuccess>
);
