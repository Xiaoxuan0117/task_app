import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

import Input from "../../atom/Input";
import Button from "../../atom/Button";
import Filter from "../../molecule/Filter";
import Order from "../../molecule/Order";
import searchButton from "../../../assets/searchButton.svg";
import closeButton from "../../../assets/closeButton.svg";

import "./style.scss";

export default function Controller() {
  const { taskSearchKeyword } = useSelector(
    (state: RootState) => state.taskList
  );
  return (
    <div className="controller">
      <form className="search-section">
        <Input
          placeholder="task keywords"
          input={taskSearchKeyword}
          type="searchTask"
        />
        <Button type="taskSearch" class="search">
          <img src={searchButton} alt="searchButton" />
        </Button>
      </form>
      <div className="filter-section">
        <Filter></Filter>
      </div>
      <div className="order-section">
        <Order></Order>
      </div>
      <div className="close-button">
        <Button type="toggleFilter" class="img-button">
          <img src={closeButton} alt="closeButton" />
        </Button>
      </div>
    </div>
  );
}
