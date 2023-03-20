import React from "react";
import { useParams } from "react-router-dom";
import LinkElement from "../../components/atom/LinkElement";
import Time from "../../components/atom/Time";
import Comment, { CommentProps } from "../../components/molecule/Comment";
import Navi from "../../components/molecule/Navi";
import TaskSidebar from "../../components/organisms/TaskSidebar";
import { TaskDetailState } from "../../type";

import "./style.scss";

export default function TaskDetail() {
  let { repo, number } = useParams();
  console.log("task detail", repo, number);
  const commentsData: CommentProps[] = [
    {
      children:
        "# A demo of `react-markdown`\r\n\r\n`react-markdown` is a markdown component for React.\r\n\r\n👉 Changes are re-rendered as you type.\r\n\r\n👈 Try writing some markdown on the left.\r\n\r\n## Overview\r\n\r\n* Follows [CommonMark](https://commonmark.org)\r\n* Optionally follows [GitHub Flavored Markdown](https://github.github.com/gfm/)\r\n* Renders actual React elements instead of using `dangerouslySetInnerHTML`\r\n* Lets you define your own components (to render `MyHeading` instead of `h1`)\r\n* Has a lot of plugins",
      username: "username",
      user_url: "https://github.com/Xiaoxuan0117",
      time: "2023-03-08T05:47:16Z",
      allowEdit: true,
    },
    {
      children:
        "# A demo of `react-markdown`\r\n\r\n`react-markdown` is a markdown component for React.\r\n\r\n👉 Changes are re-rendered as you type.\r\n\r\n👈 Try writing some markdown on the left.\r\n\r\n## Overview\r\n\r\n* Follows [CommonMark](https://commonmark.org)\r\n* Optionally follows [GitHub Flavored Markdown](https://github.github.com/gfm/)\r\n* Renders actual React elements instead of using `dangerouslySetInnerHTML`\r\n* Lets you define your own components (to render `MyHeading` instead of `h1`)\r\n* Has a lot of plugins",
      username: "username",
      user_url: "https://github.com/Xiaoxuan0117",
      time: "2023-03-08T05:47:16Z",
      allowEdit: true,
    },
    {
      children:
        "# A demo of `react-markdown`\r\n\r\n`react-markdown` is a markdown component for React.\r\n\r\n👉 Changes are re-rendered as you type.\r\n\r\n👈 Try writing some markdown on the left.\r\n\r\n## Overview\r\n\r\n*`dangerouslySetInnerHTML`\r\n* Lets you define your own components (to render `MyHeading` instead of `h1`)\r\n* Has a lot of plugins",
      username: "username",
      user_url: "https://github.com/Xiaoxuan0117",
      time: "2023-03-08T05:47:16Z",
      allowEdit: false,
    },
    {
      children:
        "# A demo of `react-markdown`\r\n\r\n`react-markdown` is a markdown component for React.\r\n\r\n👉 Changes are re-rendered as you type.\r\n\r\n👈 Try writing some markdown on the left.\r\n\r\n## Overview\r\n\r\n* Follows",
      username: "username",
      user_url: "https://github.com/Xiaoxuan0117",
      time: "2023-03-08T05:47:16Z",
      allowEdit: true,
    },
  ];

  const dammyData = [
    "user1",
    "user2",
    "user3",
    "user4",
    "user5",
    "user6",
    "user7",
    "user8",
  ];

  const data: TaskDetailState = {
    assigneeAvatar: "https://avatars.githubusercontent.com/u/94459764?v=4",
    assigneeUrl: "https://github.com/xiaoxuan0117",
    body: "Complete the layout of login page ",
    time: "2023-03-08T03:24:17Z",
    issueUrl: "https://github.com/xiaoxuan0117/task_app/issues/14",
    id: "1614590745",
    number: 14,
    repo: "task_app",
    repoUrl: "https://github.com/xiaoxuan0117/task_app",
    isOpen: true,
    title: "Layout_Login",
    creator: "xiaoxuan0117",
    creatorUrl: "https://github.com/xiaoxuan0117",
    isSearchResult: false,
    labels: ["bug", "ToDo"],
    commentsData: commentsData,
    milestone: "new milestone",
    milestoneUrl: "https://github.com/xiaoxuan0117/task_app/milestone/1",
  };
  return (
    <div className="task-page">
      <div className="navi-section">
        <Navi repoOptions={dammyData} />
      </div>
      <div className="task-content">
        <div className="header">
          <LinkElement isRouter={false} class="task" href={data.repoUrl}>
            <div className="repo">{data.repo}</div>
          </LinkElement>
          <LinkElement isRouter={false} class="task" href={data.issueUrl}>
            <div className="issue">{data.title}</div>
          </LinkElement>
          <div className="number-and-time">
            <div className="number"># {data.number}</div>
            <Time utcTime={data.time} />
          </div>
          <div className="divide"></div>
          <div className="task-data">
            <div className="comment-section">
              {commentsData.map((comment, index) => (
                <Comment key={`comment=${index}`} {...comment}>
                  {comment.children}
                </Comment>
              ))}
            </div>
            <div className="detail-section">
              <TaskSidebar
                isOpen={data.isOpen}
                labels={data.labels}
                milestone={data.milestone}
                milestone_url={data.milestoneUrl}
              ></TaskSidebar>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
