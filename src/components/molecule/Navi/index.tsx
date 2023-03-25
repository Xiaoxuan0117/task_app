import React from "react";
import Button from "../../atom/Button";
import Dropdown from "../../atom/Dropdown";
import Input from "../../atom/Input";
import searchButton from "../../../assets/searchButton.svg";

import "./style.scss";
import { setTaskSearchKeyword, taskSearch } from "../../../reducer/taskList";
import { RepoState } from "../../../type";
import { Link } from "react-router-dom";

type NaviProps = {
  repoOptions: RepoState[];
};

export default function Navi(props: NaviProps): JSX.Element {
  const { repoOptions } = props;
  return (
    <div className="navi-wrapper">
      <div className="navi">
        <div className="my-issue">
          <Link to="/">My Issue</Link>
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
    </div>
  );
}
