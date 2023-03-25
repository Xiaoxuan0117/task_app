import React from "react";
import success from "../../../assets/success.svg";

import "./style.scss";

type UploadSuccessProps = {
  text: string;
};

export default function UploadSuccess(props: UploadSuccessProps): JSX.Element {
  const { text } = props;
  return (
    <div className="success-wrapper">
      <img src={success} alt="success" />
      <div className="text">{text}</div>
    </div>
  );
}
