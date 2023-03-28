import * as React from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";

import Avatar from "../../atom/Avatar";
import editButton from "../../../assets/editButton.svg";
import LinkElement from "../../atom/LinkElement";
import Time from "../../atom/Time";
import Button from "../../atom/Button";
import Markdown from "../../atom/Markdown";
import detail from "../../../assets/detail.svg";

import "./style.scss";

export type CommentProps = {
  id: number;
  children: string;
  avatar?: string;
  username: string;
  user_url: string;
  created_at: string;
  allowEdit?: boolean;
  isBody?: boolean;
};

export default function Comment(props: CommentProps): JSX.Element {
  const {
    children,
    avatar,
    username,
    user_url,
    created_at,
    allowEdit,
    isBody,
  } = props;
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
          <div className="function">
            <Link to="edit">
              <div className={`right ${classNames(allowEdit && "show")}`}>
                <Button class="edit">
                  <img src={editButton} alt="editButton" />
                </Button>
              </div>
            </Link>
            {isBody && (
              <div className="detail-button">
                <Button type="toggleDetail" class="edit">
                  <img src={detail} alt="filter" />
                </Button>
              </div>
            )}
          </div>
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
