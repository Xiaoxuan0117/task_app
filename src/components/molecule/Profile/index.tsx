import React from "react";

import profile from "../../../assets/profile.svg";
import avatar from "../../../assets/avatar.png";
import Avatar from "../../atom/Avatar";

import "./style.scss";
import LinkElement from "../../atom/LinkElement";

export default function Profile() {
  return (
    <div className="profile-wrapper">
      <div className="userIcon">
        <img src={profile} alt="userIcon" />
      </div>
      <div className="userAvatar">
        <Avatar
          image={avatar}
          class="profile"
          href="https://github.com/Xiaoxuan0117"
        />
        <LinkElement isRouter={false} class="task">
          <div className="username">username</div>
        </LinkElement>
      </div>
    </div>
  );
}
