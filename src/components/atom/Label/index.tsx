import React from "react";

import "./style.scss";

type LabelProps = {
  children: string;
};
export default function Label(props: LabelProps): JSX.Element {
  const labelValue = props.children.replace(/\s+/g, "-").toLowerCase();
  return (
    <div className="label-wrapper">
      <div className={`label ${labelValue}`}>{props.children}</div>
    </div>
  );
}
