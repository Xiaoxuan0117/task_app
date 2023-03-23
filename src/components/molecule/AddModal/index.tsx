import React, { useState } from "react";

import Dropdown from "../../atom/Dropdown";
import Input from "../../atom/Input";
import MarkdownEditor from "../../atom/MarkdownEditor";
import Button from "../../atom/Button";
import closeButton from "../../../assets/closeButton.svg";

import "./style.scss";
import { setTaskSearchKeyword, taskSearch } from "../../../reducer/taskList";
import { Link } from "react-router-dom";

export default function AddModal() {
  const [options, setOpotions] = useState([
    "user1",
    "user2",
    "user3",
    "user1",
    "user2",
    "user3",
    "user1",
    "user2",
    "user3",
  ]);
  return (
    <div className="mask">
      <div className="modal-wrapper">
        <div className="modal">
          <div className="title-section">
            <div className="label">Title</div>
            <div className="input-section">
              <Input changeEvent={setTaskSearchKeyword} />
            </div>
          </div>
          <div className="repo-select">
            <Dropdown
              title="Repository"
              options={options}
              class="column"
              inputStyle="small"
            />
          </div>
          <div className="markdown-section">
            <MarkdownEditor />
          </div>
          <div className="footer">
            <Link to="/">
              <Button class="secondary">
                <div>Cancel</div>
              </Button>
            </Link>
            <Button clickEvent={taskSearch} class="primary">
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
