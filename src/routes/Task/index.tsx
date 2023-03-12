import React from "react";
import LinkElement from "../../components/atom/LinkElement";
import Time from "../../components/atom/Time";
import Comment from "../../components/molecule/Comment";

import "./style.scss";

export default function Task() {
  const body: string =
    "# A demo of `react-markdown`\r\n\r\n`react-markdown` is a markdown component for React.\r\n\r\n👉 Changes are re-rendered as you type.\r\n\r\n👈 Try writing some markdown on the left.\r\n\r\n## Overview\r\n\r\n* Follows [CommonMark](https://commonmark.org)\r\n* Optionally follows [GitHub Flavored Markdown](https://github.github.com/gfm/)\r\n* Renders actual React elements instead of using `dangerouslySetInnerHTML`\r\n* Lets you define your own components (to render `MyHeading` instead of `h1`)\r\n* Has a lot of plugins";

  return (
    <div className="task-page">
      <div className="header">
        <LinkElement isRouter={false} class="task">
          <div className="repo">username/repo</div>
        </LinkElement>
        <LinkElement isRouter={false} class="task">
          <div className="issue">issue</div>
        </LinkElement>
        <div className="number-and-time">
          <div className="lower">
            <div className="number"># 5</div>
            <Time utcTime="2023-03-08T05:47:16Z" />
          </div>
        </div>
        <div className="content">
          <div className="comment-section">
            <Comment>{body}</Comment>
          </div>
          <div className="setting-section"></div>
        </div>
      </div>
    </div>
  );
}
