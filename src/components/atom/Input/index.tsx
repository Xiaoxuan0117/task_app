import React from "react";

import "./style.scss";

type InputProps = {
  class?: string;
  label?: string;
  defaultInput?: string;
  placeholder?: string;
};

export default function Input(props: InputProps): JSX.Element {
  return (
    <input
      className={props.class}
      value={props.defaultInput}
      placeholder={props.placeholder}
    ></input>
  );
}
