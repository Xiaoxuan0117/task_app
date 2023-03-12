import React, { useState } from "react";
import Dropdown from "../../atom/Dropdown";

import "./style.scss";
import Input from "../../atom/Input";
import Markdown from "../../atom/Markdown";
import Button from "../../atom/Button";
import closeButton from "../../../assets/closeButton.svg";

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
    <div className="modal-wrapper">
      <div className="modal">
        <div className="title-wrapper">
          <div className="label">Title</div>
          <div className="input-box">
            <Input />
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
        <div className="body">
          <Markdown />
        </div>
        <div className="footer">
          <Button class="secondary">
            <div>Cancel</div>
          </Button>
          <Button class="primary">
            <div>Update</div>
          </Button>
        </div>
        <div className="close-button">
          <Button class="close">
            <img src={closeButton} alt="closeButton" />
          </Button>
        </div>
      </div>
    </div>
  );
}