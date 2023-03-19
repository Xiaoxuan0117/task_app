import React from "react";
import classNames from "classnames";
import { UpdateTaskParams } from "../../../type";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../store";

import "./style.scss";
import { UpdateState } from "../../../reducer/taskList";

type ToggleProps = {
  isOpen: boolean;
  taskInfo: UpdateTaskParams;
};

export default function Toggle(props: ToggleProps): JSX.Element {
  const { isStateLoading } = useSelector((state: RootState) => state.taskList);
  const dispatch = useAppDispatch();

  return (
    <div className="toggle-wrapper">
      <button
        className={`toggle ${classNames(
          props.isOpen && "open",
          isStateLoading && "loading"
        )}`}
        onClick={() => {
          dispatch(UpdateState({ ...props.taskInfo }));
        }}
        disabled={isStateLoading && true}
      >
        <div className="button-click"></div>
      </button>
    </div>
  );
}
