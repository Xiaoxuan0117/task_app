import React from "react";

import "./style.scss";

type InputProps = {
  class?: string;
  label?: string;
};

export default function Input(props: InputProps): JSX.Element {
  return <input className={props.class}></input>;
}
