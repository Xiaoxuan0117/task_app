import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import LinkElement from ".";

export default {
  title: "Atom/LinkElement",
  component: LinkElement,
} as ComponentMeta<typeof LinkElement>;

export const IssueListRepo: ComponentStory<typeof LinkElement> = () => (
  <LinkElement isRouter={false} class="issuelist">
    <div className="repo">username/repo</div>
  </LinkElement>
);

export const IssueListRepo_close: ComponentStory<typeof LinkElement> = () => (
  <LinkElement isRouter={false} class="issuelist">
    <div className="repo close">username/repo</div>
  </LinkElement>
);

export const IssueListIssue: ComponentStory<typeof LinkElement> = () => (
  <LinkElement isRouter={false} class="issuelist">
    <div className="issue">issue 1</div>
  </LinkElement>
);

export const IssueListIssue_close: ComponentStory<typeof LinkElement> = () => (
  <LinkElement isRouter={false} class="issuelist">
    <div className="issue close">issue 1</div>
  </LinkElement>
);

export const IssueListQuickInfo: ComponentStory<typeof LinkElement> = () => (
  <LinkElement isRouter={false} class="issuelist">
    <div className="quick-info">username</div>
  </LinkElement>
);

export const IssueTitle_repo: ComponentStory<typeof LinkElement> = () => (
  <LinkElement isRouter={false} class="issue">
    <div className="repo">username/repo</div>
  </LinkElement>
);

export const IssueTitle_issue: ComponentStory<typeof LinkElement> = () => (
  <LinkElement isRouter={false} class="issue">
    <div className="issue">issue</div>
  </LinkElement>
);

export const IssueUsername: ComponentStory<typeof LinkElement> = () => (
  <LinkElement isRouter={false} class="issue">
    <div className="username">username</div>
  </LinkElement>
);

export const IssueMilestone: ComponentStory<typeof LinkElement> = () => (
  <LinkElement isRouter={false} class="issue">
    <div className="milestone">milestone</div>
  </LinkElement>
);
