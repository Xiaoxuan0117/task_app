import React from "react";
import LinkElement from "../../atom/LinkElement";
import Tag from "../../atom/Tag";
import Toggle from "../../atom/Toggle";

import "./style.scss";

type TaskDetailProps = {
  isOpen: boolean;
  tags: string[];
  milestone: string;
  milestone_url: string;
};

export default function TaskDetail(props: TaskDetailProps): JSX.Element {
  const { isOpen, tags, milestone, milestone_url } = props;
  return (
    <div className="taskDetail-wrapper">
      <div className="taskDetail">
        <div className="section status">
          <div className="title">Open/Closed</div>
          <Toggle isOpen={isOpen} />
        </div>
        <div className="section labels">
          <div className="title">Labels</div>
          <div className="tags">
            {tags.map((tag) => (
              <Tag>{tag}</Tag>
            ))}
          </div>
        </div>
        <div className="section milestone">
          <div className="title">Milestone</div>
          <LinkElement isRouter={false} class="task">
            <div className="milestone">milestone</div>
          </LinkElement>
        </div>
      </div>
    </div>
  );
}
