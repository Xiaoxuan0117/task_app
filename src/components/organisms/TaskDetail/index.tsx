import React from "react";
import LinkElement from "../../atom/LinkElement";
import Label from "../../atom/Label";
import Toggle from "../../atom/Toggle";

import "./style.scss";

type TaskDetailProps = {
  isOpen: boolean;
  labels: string[];
  milestone: string;
  milestone_url: string;
};

const dammyTaskInfo = {
  owner: "creator",
  repo: "repo",
  number: 0,
};

export default function TaskDetail(props: TaskDetailProps): JSX.Element {
  const { isOpen, labels, milestone, milestone_url } = props;
  return (
    <div className="taskDetail-wrapper">
      <div className="taskDetail">
        <div className="section status">
          <div className="title">Open/Closed</div>
          <Toggle isOpen={isOpen} taskInfo={dammyTaskInfo} />
        </div>
        <div className="section labels">
          <div className="title">Labels</div>
          <div className="labels">
            {labels.map((label, index) => (
              <Label key={`lable=${index}`}>{label}</Label>
            ))}
          </div>
        </div>
        <div className="section milestone">
          <div className="title">Milestone</div>
          <LinkElement
            isRouter={false}
            class="task"
            href={milestone_url || "#"}
          >
            <div className="milestone">{milestone}</div>
          </LinkElement>
        </div>
      </div>
    </div>
  );
}
