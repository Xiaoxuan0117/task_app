import * as React from "react";
import classNames from "classnames";
import Avatar from "../../atom/Avatar";
import editButton from "../../../assets/editButton.svg";
import LinkElement from "../../atom/LinkElement";
import Time from "../../atom/Time";
import Button from "../../atom/Button";
import Markdown from "../../atom/Markdown";

import "./style.scss";
import { taskSearch } from "../../../reducer/taskList";
import { Link } from "react-router-dom";

export type CommentProps = {
  id: number;
  children: string;
  avatar?: string;
  username: string;
  user_url: string;
  created_at: string;
  allowEdit?: boolean;
};

export default function Comment(props: CommentProps): JSX.Element {
  const { children, avatar, username, user_url, created_at, allowEdit } = props;
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
            <Time utcTime={created_at} />
          </div>
          <Link to="edit">
            <div className={`right ${classNames(allowEdit && "show")}`}>
              <Button class="edit">
                <img src={editButton} alt="editButton" />
              </Button>
            </div>
          </Link>
        </div>
        <div className="context-wrapper">
          <Markdown>
            {children ? children : "*no description provided*"}
          </Markdown>
        </div>
      </div>
    </div>
  );
}
