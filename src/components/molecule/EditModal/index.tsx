import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import Button from "../../atom/Button";
import Input from "../../atom/Input";
import RadioButton from "../../atom/RadioButton";
import MarkdownEditor from "../../atom/MarkdownEditor";
import closeButton from "../../../assets/closeButton.svg";

import "./style.scss";

type EditModalProps = {
  prevTitle?: string;
};

export default function EditModal(props: EditModalProps): JSX.Element {
  const LabelsOptions = ["ToDo", "In Progress", "Done"];
  const {
    title,
    status,
    body,
    inputError: { title: titleError, status: statusError, body: bodyError },
  } = useSelector((state: RootState) => state.editTask);

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
              <Input input={title} type="editTitle" />
              {titleError && (
                <div className="required-alert">*Title required</div>
              )}
            </div>
          </div>
          <div className="label-select">
            <RadioButton
              type={{ clickType: "edit", queryParam: "" }}
              options={LabelsOptions}
              select={status.toLowerCase()}
            ></RadioButton>
            {statusError && (
              <div className="required-alert">*Status required</div>
            )}
          </div>
          <div className="markdown-section">
            <MarkdownEditor type="editBody" body={body} />
            {bodyError && (
              <div className="required-alert">
                *Body needs at least 30 words
              </div>
            )}
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
