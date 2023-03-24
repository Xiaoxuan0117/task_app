import React, { useEffect, useState } from "react";
import classNames from "classnames";

import dropdownIcon from "../../../assets/dropdownIcon.svg";

import "./style.scss";
import { RepoState } from "../../../type";
import { Link } from "react-router-dom";

type DropdownProps = {
  class?: string;
  inputStyle?: string;
  title: string;
  options: RepoState[];
  type: string;
};

export default function Dropdown(props: DropdownProps): JSX.Element {
  const { class: style, inputStyle, title, options, type } = props;

  const [active, setActive] = useState(false);
  const [selected, setSelected] = useState("My repo");

  const toggleDropdown = () => {
    setActive(active ? false : true);
  };

  const closeDropdown = () => {
    setActive(false);
  };

  const setOption = (options: RepoState[], type: string) => {
    switch (type) {
      case "link":
        return (
          <ul>
            {options.length !== 0 ? (
              options.map((option, index) => (
                <li key={`${option.id}`}>
                  <Link to={`/${option.name}`}>
                    <button
                      onBlur={() =>
                        index + 1 === options.length && closeDropdown()
                      }
                    >
                      {option.name}
                    </button>
                  </Link>
                </li>
              ))
            ) : (
              <li>empty</li>
            )}
          </ul>
        );
      case "select":
        return (
          <ul>
            {options.length !== 0 ? (
              options.map((option, index) => (
                <li key={`${option.id}`}>
                  <button
                    onBlur={() =>
                      index + 1 === options.length && closeDropdown()
                    }
                  >
                    {option.name}
                  </button>
                </li>
              ))
            ) : (
              <li>empty</li>
            )}
          </ul>
        );
    }
  };

  useEffect(() => {
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
        <div className="options">{setOption(options, type)}</div>
      </div>
    </div>
  );
}
