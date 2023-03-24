import { ActionCreatorWithoutPayload, AsyncThunk } from "@reduxjs/toolkit";
import React from "react";
import { useAppDispatch } from "../../../store";
import { PostTaskPayload } from "../../../type";

import "./style.scss";

type ButtonProps = {
  children: JSX.Element;
  class?: string;
  clickEvent?:
    | ActionCreatorWithoutPayload<"taskList/taskSearch">
    | AsyncThunk<
        PostTaskPayload,
        undefined,
        {
          state: {
            user: { name: string };
            addTask: {
              title: string;
              repo: string;
              body: string;
            };
          };
        }
      >;
};

export default function Button(props: ButtonProps): JSX.Element {
  const { children, class: buttonClass, clickEvent } = props;
  const dispatch = useAppDispatch();
  return clickEvent ? (
    <button
      className={`button ${buttonClass}`}
      onClick={(e) => {
        e.preventDefault();
        dispatch(clickEvent());
      }}
    >
      {children}
    </button>
  ) : (
    <button className={`button ${buttonClass}`}>{children}</button>
  );
}
