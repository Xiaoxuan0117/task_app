import React from "react";
import Button from "../../atom/Button";
import Dropdown from "../../atom/Dropdown";
import Input from "../../atom/Input";
import searchButton from "../../../assets/searchButton.svg";

import "./style.scss";
import { setTaskSearchKeyword, taskSearch } from "../../../reducer/taskList";
import { RepoState } from "../../../type";

type NaviProps = {
  repoOptions: RepoState[];
};

export default function Navi(props: NaviProps): JSX.Element {
  const { repoOptions } = props;
  return (
    <div className="navi-wrapper">
      <div className="navi">
        <div className="my-issue">
          <a href="/">My Issue</a>
        </div>
        <div className="repo_select">
          <Dropdown
            class="row"
            inputStyle="large"
            title="Repository"
            options={repoOptions}
          ></Dropdown>
        </div>
        <div className="repo_search">
          <Input
            placeholder="repository keywords"
            changeEvent={setTaskSearchKeyword}
          />
          <Button clickEvent={taskSearch} class="search">
            <img src={searchButton} alt="searchButton" />
          </Button>
        </div>
      </div>
    </div>
  );
}
