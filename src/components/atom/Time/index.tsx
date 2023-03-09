import React from "react";
import { parseISO, format } from "date-fns";

import "./style.scss";

type TimeProps = {
  utcTime: string;
};

export default function Time(props: TimeProps): JSX.Element {
  const date = parseISO(props.utcTime);
  return (
    <div className="time">
      <span>{format(date, "MMM")}</span>&nbsp;
      <span>{format(date, "d")}</span>,&nbsp;
      <span>{format(date, "yyyy")}</span>,&nbsp;
      <span>{format(date, "h")}</span>:<span>{format(date, "m")}</span>&nbsp;
      <span>{format(date, "a")}</span>
    </div>
  );
}
