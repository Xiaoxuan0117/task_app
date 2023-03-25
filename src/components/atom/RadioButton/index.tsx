import classNames from "classnames";
import React from "react";
import { selectStatus } from "../../../reducer/editTask";
import { setFilter } from "../../../reducer/taskList";
import { useAppDispatch } from "../../../store";

import "./style.scss";

type RadioButtonProps = {
  class?: string;
  options: string[];
  type: { clickType: string; queryParam: string };
  select?: string;
};

export default function RadioButton(props: RadioButtonProps): JSX.Element {
  const {
    options,
    type: { clickType, queryParam },
    select,
  } = props;
  const dispatch = useAppDispatch();

  const clickEvent = (option: string, optionLowerCase: string) => {
    switch (clickType) {
      case "filter":
        return dispatch(
          setFilter({ type: queryParam, option: optionLowerCase })
        );
      case "edit":
        return dispatch(selectStatus(option));
    }
  };

  return (
    <div className="radio-wrapper">
      <div className="radio">
        {options.map((option, index) => {
          const optionLowerCase: string = option.toLowerCase();
          const keyValue = optionLowerCase.replace(/\s+/g, "-");
          return (
            <button
              key={`${index}-${keyValue}`}
              className={`"option" ${classNames(
                select === optionLowerCase && "active"
              )} ${keyValue}`}
              onClick={() => {
                clickEvent(option, optionLowerCase);
              }}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}
