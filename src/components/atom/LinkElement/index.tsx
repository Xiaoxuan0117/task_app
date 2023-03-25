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
  const { children, class: linkClass, href, isRouter } = props;
  if (isRouter) {
    return (
      <Link to={href || "#"} className={`link ${linkClass}`}>
        {children}
      </Link>
    );
  }
  return (
    <a
      className={`link ${linkClass}`}
      href={href ? `${href}` : `#`}
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  );
}
