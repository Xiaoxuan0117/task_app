import React from "react";

import "./style.scss";

type AvatarProps = {
  class: string;
  image: string;
  href: string;
};

export default function Avatar(props: AvatarProps): JSX.Element {
  return (
    <a href={props.href} target="_blank" rel="noreferrer">
      <div className={props.class}>
        <img src={props.image} alt="avatar"></img>
      </div>
    </a>
  );
}
