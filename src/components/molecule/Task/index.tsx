import React from "react";
import LinkElement from "../../atom/LinkElement";
import Tag from "../../atom/Tag";
import Time from "../../atom/Time";
import Toggle from "../../atom/Toggle";

import avatar from "../../../assets/avatar.png";

import "./style.scss";
import Avatar from "../../atom/Avatar";

export default function Task() {
  return (
    <div className="task-wrapper">
      <div className="task">
        <div className="left">
          <div className="toggle-box">
            <Toggle />
          </div>
          <div className="content-wrapper">
            <div className="upper">
              <LinkElement isRouter={false} class="tasklist">
                <div className="title">username/repo</div>
              </LinkElement>
              <LinkElement isRouter={false} class="tasklist">
                <div className="title">issue 1</div>
              </LinkElement>
              <div className="tags">
                <Tag children={"In Progress"} />
              </div>
            </div>
            <div className="lower">
              <div className="number"># 5</div>
              <Time utcTime={"2023-03-08T05:47:16Z"} />
              <div className="creator">
                by&nbsp;
                <LinkElement isRouter={false} class="tasklist">
                  <div className="quick-info">username</div>
                </LinkElement>
              </div>
            </div>
          </div>
        </div>
        <div className="right">
          <Avatar
            image={avatar}
            class="member"
            href="https://github.com/Xiaoxuan0117"
          />
        </div>
      </div>
    </div>
  );
}
