import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../store";
import { resetUpdateResult } from "../../../reducer/editTask";

import Button from "../../atom/Button";
import Input from "../../atom/Input";
import RadioButton from "../../atom/RadioButton";
import MarkdownEditor from "../../atom/MarkdownEditor";
import UploadSuccess from "../../atom/UploadSuccess";
import ErrorMessage from "../../atom/ErrorMessage";
import Loading from "../../atom/Loading";
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
    isUploading,
    isSuccess,
    errMsg,
    errStatus,
  } = useSelector((state: RootState) => state.editTask);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const body = document.body;
    body.style.overflow = "hidden";

    return () => {
      dispatch(resetUpdateResult());
      body.style.overflow = "unset";
    };
  }, [dispatch]);

  const innerContent = (
    isUploading: boolean,
    isSuccess: boolean,
    errMsg: string
  ) => {
    if (isUploading) {
      return (
        <div className="loading-section">
          <Loading text="Uploading" />
        </div>
      );
    }

    if (isSuccess) {
      return (
        <div className="success-section">
          <UploadSuccess text="Edited Task Uploaded Successfully!!" />
          <div className="close-button">
            <Button type="editCloseRefresh" class="img-button">
              <img src={closeButton} alt="closeButton" />
            </Button>
          </div>
        </div>
      );
    }

    if (errMsg) {
      return (
        <div className="error-section">
          <ErrorMessage text={errMsg} type="editTask" errStatus={errStatus} />
          <div className="close-button">
            <Button type="close" class="img-button">
              <img src={closeButton} alt="closeButton" />
            </Button>
          </div>
        </div>
      );
    }
    return (
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
            <div className="required-alert">*Body needs at least 30 words</div>
          )}
        </div>
        <div className="footer">
          <Button type="close" class="secondary">
            <div>Cancel</div>
          </Button>
          <Button type="update" class="primary">
            <div>Update</div>
          </Button>
        </div>
        <div className="close-button">
          <Button type="close" class="img-button">
            <img src={closeButton} alt="closeButton" />
          </Button>
        </div>
      </div>
    );
  };
  return (
    <div className="mask">
      <div className="modal-wrapper">
        {innerContent(isUploading, isSuccess, errMsg)}
      </div>
    </div>
  );
}
