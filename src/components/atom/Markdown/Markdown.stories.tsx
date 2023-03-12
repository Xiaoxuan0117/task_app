import { ComponentStory, ComponentMeta } from "@storybook/react";

import Markdonw from ".";

export default {
  title: "Markdonw",
  component: Markdonw,
} as ComponentMeta<typeof Markdonw>;

export const Primary: ComponentStory<typeof Markdonw> = () => <Markdonw />;
