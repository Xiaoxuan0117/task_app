import React from "react";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

import { useAppDispatch } from "../../../store";

import "./style.scss";

type InputProps = {
  class?: string;
  label?: string;
  input?: string;
  placeholder?: string;
  changeEvent: ActionCreatorWithPayload<
    string,
    "taskList/setTaskSearchKeyword"
  >;
};

export default function Input(props: InputProps): JSX.Element {
  const { changeEvent } = props;
  const dispatch = useAppDispatch();
  return (
    <input
      className={props.class}
      value={props.input}
      placeholder={props.placeholder}
      onChange={(e) => {
        dispatch(changeEvent(e.target.value));
      }}
    ></input>
  );
}
