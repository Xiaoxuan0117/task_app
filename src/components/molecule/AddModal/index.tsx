import React, { useEffect } from "react";
import Dropdown from "../../atom/Dropdown";
import Input from "../../atom/Input";
import MarkdownEditor from "../../atom/MarkdownEditor";
import Button from "../../atom/Button";
import closeButton from "../../../assets/closeButton.svg";
import { RootState } from "../../../store";
import { useSelector } from "react-redux";

import "./style.scss";
import { Link } from "react-router-dom";
import { selectRepo, setAddBody, setAddTitle } from "../../../reducer/addTask";

export default function AddModal() {
  const {
    user: { repoList },
    addTask: {
      repo,
      inputError: { title: titleError, repo: repoError, body: bodyError },
    },
  } = useSelector((state: RootState) => state);

  useEffect(() => {
    const body = document.body;
    body.style.overflow = "hidden";

    return () => {
      body.style.overflow = "unset";
    };
  });
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
            <Button type="cancel" class="secondary">
              <div>Cancel</div>
            </Button>
            <Button type="update" class="primary">
              <div>Update</div>
            </Button>
          </div>
          <div className="close-button">
            <Link to="/">
              <Button type="cancel" class="close">
                <img src={closeButton} alt="closeButton" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
