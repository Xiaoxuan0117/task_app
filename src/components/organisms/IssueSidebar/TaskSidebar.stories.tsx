import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import IssueSidebar from ".";

export default {
  title: "Organisms/IssueSidebar",
  component: IssueSidebar,
} as ComponentMeta<typeof IssueSidebar>;

export const Primary: ComponentStory<typeof IssueSidebar> = () => (
  <IssueSidebar
    isOpen={false}
    labels={["ToDo", "Bug"]}
    milestone={"new milestone"}
    milestone_url="https://github.com/xiaoxuan0117/issue_app/milestone/1"
    issueInfo={{
      repoOwner: "",
      repoName: "",
      number: 0,
    }}
    assignees={[]}
  ></IssueSidebar>
);
