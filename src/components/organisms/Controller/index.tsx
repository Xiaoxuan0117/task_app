import React from "react";
import Input from "../../atom/Input";
import Filter from "../../molecule/Filter";

import searchButton from "../../../assets/searchButton.svg";
import Button from "../../atom/Button";
import Order from "../../molecule/Order";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { setTaskSearchKeyword } from "../../../reducer/taskList";
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
    </div>
  );
}
