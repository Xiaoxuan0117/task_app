import classNames from "classnames";
import React from "react";
import { setFilter } from "../../../reducer/taskList";
import { useAppDispatch } from "../../../store";

import "./style.scss";

type RadioButtonProps = {
  class?: string;
  options: string[];
  type: string;
  select?: string;
};

export default function RadioButton(props: RadioButtonProps): JSX.Element {
  const { options, type, select } = props;
  const dispatch = useAppDispatch();

  return (
    <div className="radio-wrapper">
      <div className="radio">
        {options.map((option) => {
          const optionLowerCase: string = option.toLowerCase();
          const keyValue = optionLowerCase.replace(/\s+/g, "-");
          return (
            <button
              key={keyValue}
              className={`"option" ${classNames(
                select === optionLowerCase && "active"
              )} ${keyValue}`}
              onClick={() =>
                dispatch(setFilter({ type, option: optionLowerCase }))
              }
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}
