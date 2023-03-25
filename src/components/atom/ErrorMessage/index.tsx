import React from "react";

import "./style.scss";

type ErrorMessageProps = {
  text: string;
  type?: string;
};

export default function ErrorMessage(props: ErrorMessageProps): JSX.Element {
  const { text, type } = props;

  const uploadTask = (type: string | undefined) => {
    switch (type) {
      case "addTask":
        return "New Task Upload failed!!";
      case "editTask":
        return "Edited Task Upload failed!!";
      default:
        return "";
    }
  };
  return (
    <div className="err-wrapper">
      <div className="uploadMsg">{uploadTask(type)}</div>
      <div className="err">{text}</div>
    </div>
  );
}
