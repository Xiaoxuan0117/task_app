import React from "react";
import LinkElement from "../../atom/LinkElement";
import Tag from "../../atom/Tag";
import Time from "../../atom/Time";
import Toggle from "../../atom/Toggle";

import avatar from "../../../assets/avatar.png";

import "./style.scss";
import Avatar from "../../atom/Avatar";

export type TaskProps = {
  isOpen: boolean;
  repo: string;
  repo_url: string;
  issue: string;
  issue_url: string;
  tags: string[];
  time: string;
  creator: string;
  creator_url: string;
  assignee_avatar?: string;
  assignee_url: string;
};

export default function Task(props: TaskProps): JSX.Element {
  const {
    isOpen,
    repo,
    repo_url,
    issue,
    issue_url,
    tags,
    time,
    creator,
    creator_url,
    assignee_url,
  } = props;
  return (
    <div className="task-wrapper">
      <div className="task">
        <div className="left">
          <div className="toggle-box">
            <Toggle isOpen={isOpen} />
          </div>
          <div className="content-wrapper">
            <div className="upper">
              <LinkElement isRouter={false} class="tasklist" href={repo_url}>
                <div className="repo">{repo}</div>
              </LinkElement>
              <LinkElement isRouter={false} class="tasklist" href={issue_url}>
                <div className="issue">{issue}</div>
              </LinkElement>
              <div className="tags">
                {tags.map((tag) => (
                  <Tag children={tag} />
                ))}
              </div>
            </div>
            <div className="lower">
              <div className="number"># 5</div>
              <Time utcTime={time} />
              <div className="creator">
                by&nbsp;
                <LinkElement
                  isRouter={false}
                  class="tasklist"
                  href={creator_url}
                >
                  <div className="quick-info">{creator}</div>
                </LinkElement>
              </div>
            </div>
          </div>
        </div>
        <div className="right">
          <Avatar image={avatar} class="member" href={assignee_url} />
        </div>
      </div>
    </div>
  );
}
