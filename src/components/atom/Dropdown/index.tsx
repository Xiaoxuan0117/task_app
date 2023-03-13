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

  const toggleDropdown = () => {
    setActive(active ? false : true);
  };

  const closeDropdown = () => {
    setActive(false);
  };

  const openDropdown = () => {
    setActive(true);
  };

  useEffect(() => {
    setTimeout(() => {
      setSelected("user1");
    }, 3000);

    const handler = () => {
      closeDropdown();
    };

    document.addEventListener("mousedown", handler);
  });
  return (
    <div className={`dropdown ${style}`}>
      <div className="title">{title}</div>
      <div
        className={`input-wrapper ${inputStyle} ${classNames(
          active && "active"
        )}`}
      >
        <button className="input" onClick={toggleDropdown}>
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
              options.map((option, index) => (
                <li key={`${option}-${index}`}>
                  <button
                    onBlur={() =>
                      index + 1 === options.length && closeDropdown()
                    }
                  >
                    {option}
                  </button>
                </li>
              ))
            ) : (
              <li>empty</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
