import React from "react";

import "./style.scss";

type TagProps = {
  children: string;
};
export default function Tag(props: TagProps): JSX.Element {
  const tagValue = props.children.replace(/\s+/g, "-").toLowerCase();
  return (
    <div className="tag-wrapper">
      <div className={`tag ${tagValue}`}>{props.children}</div>
    </div>
  );
}
