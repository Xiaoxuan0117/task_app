import React from "react";
import { Link } from "react-router-dom";

import "./style.scss";

type LinkProps = {
  children: JSX.Element;
  class?: string;
  href?: string;
  isRouter: boolean;
};

export default function LinkDOM(props: LinkProps): JSX.Element {
  if (props.isRouter) {
    return <Link to="/"></Link>;
  }
  return (
    <a
      className={`link ${props.class}`}
      href={props.href ? `${props.href}` : `#`}
    >
      {props.children}
    </a>
  );
}
