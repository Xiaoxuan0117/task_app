import React, { useEffect } from "react";
import Button from "../../atom/Button";
import Input from "../../atom/Input";
import RadioButton from "../../atom/RadioButton";
import MarkdownEditor from "../../atom/MarkdownEditor";
import closeButton from "../../../assets/closeButton.svg";

import "./style.scss";
import { setTaskSearchKeyword, taskSearch } from "../../../reducer/taskList";
import { setAddBody } from "../../../reducer/addTask";

type EditModalProps = {
  prevTitle?: string;
};

export default function EditModal(props: EditModalProps): JSX.Element {
  const LabelsOptions = ["ToDo", "In Progress", "Done"];

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
              <Input
                input={props.prevTitle}
                changeEvent={setTaskSearchKeyword}
              />
            </div>
          </div>
          <div className="label-select">
            <RadioButton
              type={{ clickType: "edit", queryParam: "" }}
              options={LabelsOptions}
            ></RadioButton>
          </div>
          <div className="markdown-section">
            <MarkdownEditor changeEvent={setAddBody} />
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
            <Button type="cancel" class="close">
              <img src={closeButton} alt="closeButton" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
