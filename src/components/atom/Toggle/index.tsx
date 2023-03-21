import React from "react";
import classNames from "classnames";
import { TaskRequiredInfo } from "../../../type";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../store";

import "./style.scss";
import { UpdateState } from "../../../reducer/taskList";
import { UpdateDetailState } from "../../../reducer/taskDetail";

type ToggleProps = {
  isOpen: boolean;
  taskInfo: TaskRequiredInfo;
  type: string;
};

export default function Toggle(props: ToggleProps): JSX.Element {
  const { isOpen, taskInfo, type } = props;
  const {
    taskList: { isStateLoading: listStateLoading },
    taskDetail: { isStateLoading: detailStateLoading },
  } = useSelector((state: RootState) => state);
  const dispatch = useAppDispatch();

  const clickEvent = (params: TaskRequiredInfo) => {
    switch (type) {
      case "taskList":
        return dispatch(UpdateState(params));
      case "taskDetail":
        return dispatch(UpdateDetailState(params));
      default:
        return console.log("toggle erro");
    }
  };

  return (
    <div className="toggle-wrapper">
      <button
        className={`toggle ${classNames(
          isOpen && "open",
          (listStateLoading || detailStateLoading) && "loading"
        )}`}
        onClick={() => {
          clickEvent(taskInfo);
        }}
        disabled={(listStateLoading || detailStateLoading) && true}
      >
        <div className="button-click"></div>
      </button>
    </div>
  );
}
