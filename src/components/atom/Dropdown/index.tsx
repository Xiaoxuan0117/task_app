import React, { useEffect, useState } from "react";
import classNames from "classnames";

import dropdownIcon from "../../../assets/dropdownIcon.svg";

import "./style.scss";

type DropdownProps = {
  class?: string;
  inputStyle?: string;
  title: string;
  options: string[];
  optionChangeEvent?: () => void;
};

export default function Dropdown(props: DropdownProps): JSX.Element {
  const { class: style, inputStyle, title, options } = props;

  const [active, setActive] = useState(false);
  const [selected, setSelected] = useState("My repo");

  useEffect(() => {
    setTimeout(() => {
      setSelected("user1");
    }, 3000);
  });

  const toggleDropdown = () => {
    setActive(active ? false : true);
  };

  const closeDropdwon = () => {
    setActive(false);
  };
  return (
    <div className={`dropdown ${style}`}>
      <div className="title">{title}</div>
      <div
        className={`input-wrapper ${inputStyle} ${classNames(
          active && "active"
        )}`}
      >
        <button
          className="input"
          onClick={toggleDropdown}
          onBlur={closeDropdwon}
        >
          <div className={classNames(selected !== "My repo" && "selected")}>
            {selected}
          </div>
          <div className="icon">
            <img src={dropdownIcon} alt="dropdownIcon" />
          </div>
        </button>
        <div className="options">
          <ul>
            {options.length !== 0 ? (
              options.map((option) => <li>{option}</li>)
            ) : (
              <li>empty</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
