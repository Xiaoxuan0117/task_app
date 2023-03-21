import React from "react";
import LinkElement from "../../atom/LinkElement";
import Label from "../../atom/Label";
import Time from "../../atom/Time";
import Toggle from "../../atom/Toggle";
import Avatar from "../../atom/Avatar";
import { TaskProps } from "../../../type";

import "./style.scss";

export default function Task(props: TaskProps): JSX.Element {
  const {
    isOpen,
    repo,
    repoUrl,
    title,
    issueUrl,
    labels,
    time,
    creator,
    creatorUrl,
    assigneeUrl,
    number,
    assigneeAvatar,
    body,
  } = props;

  const taskInfo = {
    owner: creator,
    repo: repo,
    number: number,
  };

  const briefBody = body ? (
    body.replace(/[^\w\s]/g, "")
  ) : (
    <i>no description provided</i>
  );
  return (
    <div className="task-wrapper">
      <div className="task">
        <div className="left">
          <div className="toggle-section">
            <Toggle isOpen={isOpen} taskInfo={taskInfo} type="taskList" />
          </div>
          <div className="content-section">
            <div className="upper">
              <LinkElement isRouter={false} class="tasklist" href={repoUrl}>
                <div className="repo">{repo}</div>
              </LinkElement>
              <LinkElement
                isRouter={true}
                class="tasklist"
                href={`${creator}/${repo}/${number}`}
              >
                <div className="issue">{title}</div>
              </LinkElement>
              <div className="labels">
                {labels.map((label, index) => (
                  <Label key={`label-${index}`} children={label} />
                ))}
              </div>
            </div>
            <div className="middle">
              <p>{briefBody}</p>
            </div>
            <div className="lower">
              <div className="number"># {number}</div>
              <Time utcTime={time} />
              <div className="creator">
                by&nbsp;
                <LinkElement
                  isRouter={false}
                  class="tasklist"
                  href={creatorUrl}
                >
                  <div className="quick-info">{creator}</div>
                </LinkElement>
              </div>
            </div>
          </div>
        </div>
        <div className="right">
          {assigneeUrl && (
            <Avatar image={assigneeAvatar} class="member" href={assigneeUrl} />
          )}
        </div>
      </div>
    </div>
  );
}
