import * as React from "react";
import classNames from "classnames";
import Avatar from "../../atom/Avatar";
import avatar from "../../../assets/avatar.png";
import editButton from "../../../assets/editButton.svg";
import LinkElement from "../../atom/LinkElement";
import Time from "../../atom/Time";
import Button from "../../atom/Button";
import Markdown from "../../atom/Markdown";

import "./style.scss";
import { taskSearch } from "../../../reducer/taskList";

export type CommentProps = {
  children: string;
  avatar?: string;
  username: string;
  user_url: string;
  time: string;
  allowEdit: boolean;
};

export default function Comment(props: CommentProps): JSX.Element {
  const { children, username, user_url, time, allowEdit } = props;
  return (
    <div className="comment">
      <div className="avatar-wrapper">
        <Avatar image={avatar} class="member" href={user_url} />
      </div>
      <div className="content">
        <div className="info">
          <div className="left">
            <LinkElement isRouter={false} class="task" href={user_url}>
              <div className="username">{username}</div>
            </LinkElement>
            <Time utcTime={time} />
          </div>
          <div className={`right ${classNames(allowEdit && "show")}`}>
            <Button clickEvent={taskSearch} class="edit">
              <img src={editButton} alt="editButton" />
            </Button>
          </div>
        </div>
        <div className="context-wrapper">
          <Markdown>{children}</Markdown>
        </div>
      </div>
    </div>
  );
}
