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
        <div className="title">Welcome to Github Tasks Management System</div>
        <div className="context">
          <a href="/login">Login</a> and start to manage your tasks !
        </div>
      </div>
    </div>
  );
}
