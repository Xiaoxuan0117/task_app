import React from "react";

import LinkElement from "../../atom/LinkElement";
import Button from "../../atom/Button";
import Profile from "../Profile";
import logout from "../../../assets/logout.svg";
import instructions from "../../../assets/instructions.svg";

import "./style.scss";

export default function Tool() {
  return (
    <div className="tool-wrapper">
      <div className="instructions">
        <LinkElement isRouter={true} href={"instructions"}>
          <img src={instructions} alt="closeButton" />
        </LinkElement>
      </div>
      <Button class="logout-button" type="logout">
        <img src={logout} alt="closeButton" />
      </Button>
      <Profile />
    </div>
  );
}
