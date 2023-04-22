import React, { useEffect } from "react";

import "./style.scss";

export default function Welcome() {
  useEffect(() => {
    const body = document.body;
    body.style.overflow = "hidden";

    return () => {
      body.style.overflow = "unset";
    };
  });
  return (
    <div className="welcome-mask">
      <div className="welcome-wrapper">
        <div className="title">Welcome to Github Issues Management System</div>
        <div className="context">
          <a href="/login">
            Login <span>(click me !)</span>
          </a>
          <br />
          and start to manage your issues !
        </div>
      </div>
    </div>
  );
}
