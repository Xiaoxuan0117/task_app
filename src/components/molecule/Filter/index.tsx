import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import RadioButton from "../../atom/RadioButton";
import "./style.scss";

export default function Filter() {
  const {
    taskList: {
      filter: { state, labels, category },
    },
    user: { showRepo },
  } = useSelector((state: RootState) => state);
  const statusOptions = ["All", "Open", "Closed"];
  const LabelsOptions = ["All", "ToDo", "In Progress", "Done"];
  const CategoryOptions = ["Created", "Assigned", "Mentioned"];

  return (
    <div className="filter">
      <div className="title">Filter</div>
      <RadioButton
        type={{ clickType: "filter", queryParam: "state" }}
        select={state}
        options={statusOptions}
      ></RadioButton>
      <RadioButton
        type={{ clickType: "filter", queryParam: "labels" }}
        select={labels}
        options={LabelsOptions}
      ></RadioButton>
      <RadioButton
        type={{ clickType: "filter", queryParam: "category" }}
        select={category}
        options={CategoryOptions}
      ></RadioButton>
    </div>
  );
}
