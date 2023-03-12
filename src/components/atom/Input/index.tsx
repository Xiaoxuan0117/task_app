import React from "react";

import "./style.scss";

type InputProps = {
  class?: string;
  label?: string;
  defaultInput?: string;
};

export default function Input(props: InputProps): JSX.Element {
  return <input className={props.class} value={props.defaultInput}></input>;
}
