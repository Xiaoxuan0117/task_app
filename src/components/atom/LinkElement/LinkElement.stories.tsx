import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import LinkElement from ".";

export default {
  title: "Atom/LinkElement",
  component: LinkElement,
} as ComponentMeta<typeof LinkElement>;

export const TaskListRepo: ComponentStory<typeof LinkElement> = () => (
  <LinkElement isRouter={false} class="tasklist">
    <div className="repo">username/repo</div>
  </LinkElement>
);

export const TaskListRepo_close: ComponentStory<typeof LinkElement> = () => (
  <LinkElement isRouter={false} class="tasklist">
    <div className="repo close">username/repo</div>
  </LinkElement>
);

export const TaskListIssue: ComponentStory<typeof LinkElement> = () => (
  <LinkElement isRouter={false} class="tasklist">
    <div className="issue">issue 1</div>
  </LinkElement>
);

export const TaskListIssue_close: ComponentStory<typeof LinkElement> = () => (
  <LinkElement isRouter={false} class="tasklist">
    <div className="issue close">issue 1</div>
  </LinkElement>
);

export const TaskListQuickInfo: ComponentStory<typeof LinkElement> = () => (
  <LinkElement isRouter={false} class="tasklist">
    <div className="quick-info">username</div>
  </LinkElement>
);

export const TaskTitle_repo: ComponentStory<typeof LinkElement> = () => (
  <LinkElement isRouter={false} class="task">
    <div className="repo">username/repo</div>
  </LinkElement>
);

export const TaskTitle_issue: ComponentStory<typeof LinkElement> = () => (
  <LinkElement isRouter={false} class="task">
    <div className="issue">issue</div>
  </LinkElement>
);

export const TaskUsername: ComponentStory<typeof LinkElement> = () => (
  <LinkElement isRouter={false} class="task">
    <div className="username">username</div>
  </LinkElement>
);

export const TaskMilestone: ComponentStory<typeof LinkElement> = () => (
  <LinkElement isRouter={false} class="task">
    <div className="milestone">milestone</div>
  </LinkElement>
);
