import React from "react";
import Dropdown from "../../atom/Dropdown";
import RadioButton from "../../atom/RadioButton";

import "./style.scss";

export default function Filter() {
  const statusOptions = ["Open", "Closed"];
  const LabelsOptions = ["ToDo", "In Progress", "Done"];
  const UserOptions = ["Created", "Assigned", "Mentioned"];
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
      <RadioButton options={statusOptions}></RadioButton>
      <RadioButton options={LabelsOptions}></RadioButton>
      <RadioButton options={UserOptions}></RadioButton>
      <Dropdown
        class="column"
        inputStyle="small"
        title="Assignee"
        options={assigneeDate}
      ></Dropdown>
    </div>
  );
}
