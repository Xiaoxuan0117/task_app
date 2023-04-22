import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

import RadioButton from "../../atom/RadioButton";

import "./style.scss";

export default function Order() {
  const ordersOptions = ["Desc", "Asc"];
  const {
    filter: { direction },
  } = useSelector((state: RootState) => state.issueList);

  return (
    <div className="order">
      <div className="title">Order</div>
      <RadioButton
        type={{ clickType: "filter", queryParam: "direction" }}
        select={direction}
        options={ordersOptions}
      ></RadioButton>
    </div>
  );
}
