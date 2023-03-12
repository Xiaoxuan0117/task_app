import React from "react";
import RadioButton from "../../atom/RadioButton";

import "./style.scss";

export default function Order() {
  const ordersOptions = ["Newest", "Oldest"];

  return (
    <div className="order">
      <div className="title">Order</div>
      <RadioButton options={ordersOptions}></RadioButton>
    </div>
  );
}
