import classNames from "classnames";
import React, { useEffect, useState } from "react";

import "./style.scss";

type ErrorMessageProps = {
  text: string;
  type?: string;
  errStatus?: number;
};

export default function ErrorMessage(props: ErrorMessageProps): JSX.Element {
  const { text, type, errStatus } = props;
  const [fixed, setFixed] = useState(false);

  const resolveMethod = (status: number) => {
    switch (status) {
      case 404:
        return "The repository or issue may not exist, please make sure the information in the URL is correct! In addition, it is also possible that the user authentication failed, please log out and try again.";
      case 401 || 422:
        return "Log out and try again.";
      default:
        return "Refor to error message.";
    }
  };

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

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setFixed(true);
      } else {
        setFixed(false);
      }
    });
  });
  return (
    <div className={`err-wrapper ${classNames(fixed && "fixed")}`}>
      <div className="uploadMsg">{uploadTask(type)}</div>
      <div className="err">{text}</div>
      <div className="resolve">
        Please try this solution: {resolveMethod(errStatus || 404)}
        <div className="connectMe">
          If the above information can not solve the problem, please contact me:{" "}
          <a
            href="https://github.com/Xiaoxuan0117/task_app"
            target="_blank"
            rel="noreferrer"
          >
            task_app
          </a>
        </div>
      </div>
    </div>
  );
}
