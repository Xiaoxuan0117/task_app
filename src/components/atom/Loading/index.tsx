import React from "react";

import "./style.scss";

type LoadingProps = {
  text: string;
};

export default function Loading(props: LoadingProps): JSX.Element {
  const { text } = props;
  return (
    <div className="loading">
      <div className="title">{text}</div>
      <div className="progress-box">
        <div className="progress"></div>
      </div>
    </div>
  );
}
