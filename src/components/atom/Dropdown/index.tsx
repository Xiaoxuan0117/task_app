import React, { useEffect, useState } from "react";
import classNames from "classnames";

import dropdownIcon from "../../../assets/dropdownIcon.svg";

import "./style.scss";
import { RepoState } from "../../../type";
import { Link } from "react-router-dom";
import { selectRepo } from "../../../reducer/addTask";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { useAppDispatch } from "../../../store";

type DropdownProps = {
  class?: string;
  title: string;
  value?: string;
  options: RepoState[];
  type: string;
  selectEvent?: ActionCreatorWithPayload<any, "addTask/selectRepo">;
};

export default function Dropdown(props: DropdownProps): JSX.Element {
  const { class: style, title, value, options, type } = props;
  const dispatch = useAppDispatch();

  const [active, setActive] = useState(false);

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
                  <Link to={`/${option.repoOwner}/${option.repoName}`}>
                    <button
                      onBlur={() =>
                        index + 1 === options.length && closeDropdown()
                      }
                    >
                      {option.repoName}
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
                    onClick={() => {
                      dispatch(selectRepo(option.repoName));
                    }}
                  >
                    {option.repoName}
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
      <div className={`input-wrapper ${classNames(active && "active")}`}>
        <button className="input" onClick={toggleDropdown}>
          <div className={classNames(value && "selected")}>
            {value ? value : "My repo"}
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
