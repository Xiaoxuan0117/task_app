import React from "react";
import Dropdown from "../../atom/Dropdown";
import Input from "../../atom/Input";
import MarkdownEditor from "../../atom/MarkdownEditor";
import Button from "../../atom/Button";
import closeButton from "../../../assets/closeButton.svg";
import { RootState } from "../../../store";
import { useSelector } from "react-redux";

import "./style.scss";
import { Link } from "react-router-dom";
import {
  PostTask,
  selectRepo,
  setAddBody,
  setAddTitle,
} from "../../../reducer/addTask";

export default function AddModal() {
  const {
    user: { repoList },
    addTask: {
      repo,
      inputError: { title: titleError, repo: repoError, body: bodyError },
    },
  } = useSelector((state: RootState) => state);
  return (
    <div className="mask">
      <div className="modal-wrapper">
        <div className="modal">
          <div className="title-section">
            <div className="label">Title</div>
            <div className="input-section">
              <Input changeEvent={setAddTitle} />
              {titleError && (
                <div className="required-alert">*Title required</div>
              )}
            </div>
          </div>
          <div className="repo-select">
            <Dropdown
              title="Repository"
              value={repo}
              options={repoList}
              class="column"
              type="select"
              selectEvent={selectRepo}
            />
            {repoError && (
              <div className="required-alert">*Repository required</div>
            )}
          </div>
          <div className="markdown-section">
            <MarkdownEditor changeEvent={setAddBody} />
            {bodyError && <div className="required-alert">*Body required</div>}
          </div>
          <div className="footer">
            <Link to="/">
              <Button class="secondary">
                <div>Cancel</div>
              </Button>
            </Link>
            <Button clickEvent={PostTask} class="primary">
              <div>Update</div>
            </Button>
          </div>
          <div className="close-button">
            <Link to="/">
              <Button class="close">
                <img src={closeButton} alt="closeButton" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
