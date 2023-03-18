import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import Dropdown from "../../atom/Dropdown";
import RadioButton from "../../atom/RadioButton";
import "./style.scss";

export default function Filter() {
  const {
    filter: { state, labels, category },
  } = useSelector((state: RootState) => state.taskList);
  const statusOptions = ["All", "Open", "Closed"];
  const LabelsOptions = ["All", "ToDo", "In Progress", "Done"];
  const CategoryOptions = ["Created", "Assigned", "Mentioned"];
  const assigneeDate = [
    "user1",
    "user2",
    "user3",
    "user4",
    "user5",
    "user6",
    "user7",
    "user7",
    "user8",
  ];

  return (
    <div className="filter">
      <div className="title">Filter</div>
      <RadioButton
        type="state"
        select={state}
        options={statusOptions}
      ></RadioButton>
      <RadioButton
        type="labels"
        select={labels}
        options={LabelsOptions}
      ></RadioButton>
      <RadioButton
        type="category"
        select={category}
        options={CategoryOptions}
      ></RadioButton>
      <Dropdown
        class="column"
        inputStyle="small"
        title="Assignee"
        options={assigneeDate}
      ></Dropdown>
    </div>
  );
}
