import classNames from "classnames";
import React, { useState } from "react";

import "./style.scss";

type RadioButtonProps = {
  class?: string;
  options: string[];
};

export default function RadioButton(props: RadioButtonProps): JSX.Element {
  const { options } = props;
  const [selected, setSelected] = useState("Open");

  const changeOption = (target: string) => {
    console.log(target);
    setSelected(target);
  };
  return (
    <div className="radio-wrapper">
      <div className="radio">
        {options.map((option) => {
          const keyValue = option.replace(/\s+/g, "-").toLowerCase();
          return (
            <button
              key={keyValue}
              className={`"option" ${classNames(
                selected === option && "active"
              )} ${keyValue}`}
              onClick={() => changeOption(option)}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}
