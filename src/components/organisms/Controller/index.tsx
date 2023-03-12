import React from "react";
import Input from "../../atom/Input";
import Filter from "../../molecule/Filter";

import searchButton from "../../../assets/searchButton.svg";
import Button from "../../atom/Button";
import Order from "../../molecule/Order";

import "./style.scss";

export default function Controller() {
  return (
    <div className="controller">
      <div className="search-box">
        <Input placeholder="task keywords" />
        <Button class="search">
          <img src={searchButton} alt="searchButton" />
        </Button>
      </div>
      <div className="filter-section">
        <Filter></Filter>
      </div>
      <div className="order-section">
        <Order></Order>
      </div>
    </div>
  );
}
