import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

import LinkElement from "../../atom/LinkElement";
import Avatar from "../../atom/Avatar";
import profile from "../../../assets/profile.svg";

import "./style.scss";

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
        <LinkElement isRouter={false} class="issue" href={userUrl}>
          <div className="username">{name}</div>
        </LinkElement>
      </div>
    </div>
  );
}
