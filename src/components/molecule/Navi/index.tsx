import React from "react";
import { Link } from "react-router-dom";
import cookie from "js-cookie";
import { RepoState } from "../../../type";

import Dropdown from "../../atom/Dropdown";
import Button from "../../atom/Button";
import logout from "../../../assets/logout.svg";

import "./style.scss";

type NaviProps = {
  repoOptions: RepoState[];
};

export default function Navi(props: NaviProps): JSX.Element {
  const { repoOptions } = props;
  return (
    <div className="navi-wrapper">
      <div className="navi">
        <div className="left">
          <div className="my-tasks">
            <Link to="/">My Tasks</Link>
          </div>
          <div className="repo_select">
            <Dropdown
              class="row"
              title="Repository"
              options={repoOptions}
              type="link"
            ></Dropdown>
          </div>
        </div>
        <Button
          class="logout-button"
          onClick={() => {
            cookie.remove("access_token");
            window.location.href = "/";
          }}
        >
          <img src={logout} alt="closeButton" />
        </Button>
      </div>
    </div>
  );
}
