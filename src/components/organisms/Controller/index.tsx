import React from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../store";
import {
  TriggerGetIssueList,
  issueSearch,
  toggleFilter,
} from "../../../reducer/issueList";

import Input from "../../atom/Input";
import Button from "../../atom/Button";
import Filter from "../../molecule/Filter";
import Order from "../../molecule/Order";
import searchButton from "../../../assets/searchButton.svg";
import closeButton from "../../../assets/closeButton.svg";

import "./style.scss";

export default function Controller() {
  const { issueSearchKeyword, isLoading } = useSelector(
    (state: RootState) => state.issueList
  );
  const dispatch = useAppDispatch();
  return (
    <div className="controller">
      <form className="search-section">
        <Input
          placeholder="issue keywords"
          input={issueSearchKeyword}
          type="searchIssue"
        />
        <Button
          class="search"
          disabled={isLoading}
          onClick={async () => {
            dispatch(issueSearch());
            dispatch(TriggerGetIssueList({ firstTime: true }));
          }}
        >
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
        <Button
          class="img-button"
          onClick={() => {
            dispatch(toggleFilter());
          }}
        >
          <img src={closeButton} alt="closeButton" />
        </Button>
      </div>
    </div>
  );
}
