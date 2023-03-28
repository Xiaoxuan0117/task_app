import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../store";
import { resetSubmitResult, selectRepo } from "../../../reducer/addTask";

import Dropdown from "../../atom/Dropdown";
import Input from "../../atom/Input";
import MarkdownEditor from "../../atom/MarkdownEditor";
import Button from "../../atom/Button";
import Loading from "../../atom/Loading";
import UploadSuccess from "../../atom/UploadSuccess";
import ErrorMessage from "../../atom/ErrorMessage";
import closeButton from "../../../assets/closeButton.svg";

import "./style.scss";

export default function AddModal() {
  const {
    user: { repoList },
    addTask: {
      title,
      repo,
      body,
      inputError: { title: titleError, repo: repoError, body: bodyError },
      isUploading,
      isSuccess,
      errMsg,
      errStatus,
    },
  } = useSelector((state: RootState) => state);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const body = document.body;
    body.style.overflow = "hidden";

    return () => {
      dispatch(resetSubmitResult());
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
          <UploadSuccess text="New Task Uploaded Successfully!!" />
          <div className="close-button">
            <Button type="addCloseRefresh" class="img-button">
              <img src={closeButton} alt="closeButton" />
            </Button>
          </div>
        </div>
      );
    }

    if (errMsg) {
      return (
        <div className="error-section">
          <ErrorMessage text={errMsg} type="addTask" errStatus={errStatus} />
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
            <Input type="addTitle" input={title} />
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
          <MarkdownEditor type="addBody" body={body} />
          {bodyError && (
            <div className="required-alert">*Body needs at least 30 words</div>
          )}
        </div>
        <div className="footer">
          <Button type="close" class="secondary">
            <div>Cancel</div>
          </Button>
          <Button type="add" class="primary">
            <div>Submit New Task</div>
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
