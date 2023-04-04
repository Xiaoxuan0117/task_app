import React from "react";

import "./style.scss";

type ButtonProps = {
  children: JSX.Element;
  class?: string;
  type?: string;
  disabled?: boolean;
  onClick?: () => void;
};

export default function Button(props: ButtonProps): JSX.Element {
  const { children, class: buttonClass, type, disabled, onClick } = props;
  return type && onClick ? (
    <button
      className={`button ${buttonClass}`}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      disabled={disabled}
    >
      {children}
    </button>
  ) : (
    <button className={`button ${buttonClass}`} disabled={disabled}>
      {children}
    </button>
  );
}
