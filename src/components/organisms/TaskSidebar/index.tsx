import React from "react";
import LinkElement from "../../atom/LinkElement";
import Label from "../../atom/Label";
import Toggle from "../../atom/Toggle";
import closeButton from "../../../assets/closeButton.svg";

import "./style.scss";
import Button from "../../atom/Button";

type TaskSidebarProps = {
  isOpen: boolean;
  labels: string[];
  milestone: string;
  milestone_url: string;
  taskInfo: { owner: string; repo: string; number: number };
};

export default function TaskSidebar(props: TaskSidebarProps): JSX.Element {
  const { isOpen, labels, milestone, milestone_url, taskInfo } = props;
  return (
    <div className="taskDetail-wrapper">
      <div className="taskDetail">
        <div className="section status">
          <div className="title">Open/Closed</div>
          <Toggle isOpen={isOpen} taskInfo={taskInfo} type="taskDetail" />
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
      <div className="close-button">
        <Button type="toggleDetail" class="img-button">
          <img src={closeButton} alt="closeButton" />
        </Button>
      </div>
    </div>
  );
}
