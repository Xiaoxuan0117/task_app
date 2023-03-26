import React from "react";
import LinkElement from "../../atom/LinkElement";
import Label from "../../atom/Label";
import Toggle from "../../atom/Toggle";
import closeButton from "../../../assets/closeButton.svg";

import "./style.scss";
import Button from "../../atom/Button";
import { Assignee } from "../../../type";
import Avatar from "../../atom/Avatar";

type TaskSidebarProps = {
  isOpen: boolean;
  labels: string[];
  milestone: string;
  milestone_url: string;
  assignees: Assignee[];
  taskInfo: { owner: string; repo: string; number: number };
};

export default function TaskSidebar(props: TaskSidebarProps): JSX.Element {
  const { isOpen, labels, milestone, assignees, milestone_url, taskInfo } =
    props;
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
            <div className="milestone">
              {milestone ? milestone : "no milestone"}
            </div>
          </LinkElement>
        </div>
        <div className="section assignees">
          <div className="title">Assignees</div>
          <div className="list">
            {assignees.length
              ? assignees.map((assignee) => (
                  <div className="avatar-wrapper">
                    <Avatar
                      image={assignee.avatar_url}
                      class="member"
                      href={assignee.html_url}
                    />
                  </div>
                ))
              : "no assignees"}
          </div>
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
