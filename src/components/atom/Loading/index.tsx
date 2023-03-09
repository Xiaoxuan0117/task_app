import React from "react";

import "./style.scss";

export default function Loading() {
  return (
    <div className="loading">
      <div className="title">Loading</div>
      <div className="progress-box">
        <div className="progress"></div>
      </div>
    </div>
  );
}
