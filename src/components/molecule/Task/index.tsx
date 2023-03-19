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
    issue,
    issueUrl,
    labels,
    time,
    creator,
    creatorUrl,
    assigneeUrl,
    number,
    assigneeAvatar,
  } = props;

  const taskInfo = {
    owner: creator,
    repo: repo,
    number: number,
  };
  return (
    <div className="task-wrapper">
      <div className="task">
        <div className="left">
          <div className="toggle-section">
            <Toggle isOpen={isOpen} taskInfo={taskInfo} />
          </div>
          <div className="content-section">
            <div className="upper">
              <LinkElement isRouter={false} class="tasklist" href={repoUrl}>
                <div className="repo">{repo}</div>
              </LinkElement>
              <LinkElement isRouter={false} class="tasklist" href={issueUrl}>
                <div className="issue">{issue}</div>
              </LinkElement>
              <div className="labels">
                {labels.map((label, index) => (
                  <Label key={`label-${index}`} children={label} />
                ))}
              </div>
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
