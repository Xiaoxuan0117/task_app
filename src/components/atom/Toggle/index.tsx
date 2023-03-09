import React, { useState } from "react";
import classNames from "classnames";

import "./style.scss";

export default function Toggle() {
  const [open, setOpen] = useState(false);

  const toggleChange = () => {
    setOpen(open ? false : true);
  };
  return (
    <div className="toggle-wrapper">
      <div
        className={`toggle ${classNames(open && "open")}`}
        onClick={toggleChange}
      >
        <div className="button"></div>
      </div>
    </div>
  );
}
