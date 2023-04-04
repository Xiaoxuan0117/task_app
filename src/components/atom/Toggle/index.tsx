import React from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

import "./style.scss";

type ToggleProps = {
  isOpen: boolean;
  onClick?: () => void;
};

export default function Toggle(props: ToggleProps): JSX.Element {
  const { isOpen, onClick = () => {} } = props;
  const {
    taskList: { isStateLoading: listStateLoading },
    taskDetail: { isStateLoading: detailStateLoading },
  } = useSelector((state: RootState) => state);

  return (
    <div className="toggle-wrapper">
      <button
        className={`toggle ${classNames(
          isOpen && "open",
          (listStateLoading || detailStateLoading) && "loading"
        )}`}
        onClick={() => {
          onClick();
        }}
        disabled={(listStateLoading || detailStateLoading) && true}
      >
        <div className="button-click"></div>
      </button>
    </div>
  );
}
