import React from "react";

import "./style.scss";

type ButtonProps = {
  children: JSX.Element;
  class?: string;
  clickEvent?: () => void;
};

export default function Button(props: ButtonProps): JSX.Element {
  return (
    <button className={`button ${props.class}`} onClick={props.clickEvent}>
      {props.children}
    </button>
  );
}
