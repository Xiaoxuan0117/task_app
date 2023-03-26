import React from "react";

import profile from "../../../assets/profile.svg";
import Avatar from "../../atom/Avatar";

import "./style.scss";
import LinkElement from "../../atom/LinkElement";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

export default function Profile() {
  const { name, avatar, userUrl } = useSelector(
    (state: RootState) => state.user
  );
  return (
    <div className="profile-wrapper">
      <div className="userIcon">
        <img src={profile} alt="userIcon" />
      </div>
      <div className="userAvatar">
        <Avatar image={avatar} class="profile" href={userUrl} />
        <LinkElement isRouter={false} class="task" href={userUrl}>
          <div className="username">{name}</div>
        </LinkElement>
      </div>
    </div>
  );
}
