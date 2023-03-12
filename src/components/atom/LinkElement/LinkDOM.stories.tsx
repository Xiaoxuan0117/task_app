import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import LinkElement from ".";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Atom/LinkElement",
  component: LinkElement,
} as ComponentMeta<typeof LinkElement>;

export const TaskListTitle: ComponentStory<typeof LinkElement> = () => (
  <LinkElement isRouter={false} class="tasklist">
    <div className="title">username/repo</div>
  </LinkElement>
);

export const TaskListTitle_close: ComponentStory<typeof LinkElement> = () => (
  <LinkElement isRouter={false} class="tasklist">
    <div className="title close">username/repo</div>
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
