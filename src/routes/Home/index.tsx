import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Button from "../../components/atom/Button";
import Navi from "../../components/molecule/Navi";
import Controller from "../../components/organisms/Controller";
import TaskList from "../../components/organisms/TaskList";
import { fetchTaskList, scrollToButtom } from "../../reducer/taskList";
import { RootState, useAppDispatch } from "../../store";

import "./style.scss";

export default function Home() {
  const {
    taskList: taskListData,
    isLoading,
    errMsg,
  } = useSelector((state: RootState) => state.taskList);
  const dispatch = useAppDispatch();
  const dammyData = [
    "user1",
    "user2",
    "user3",
    "user4",
    "user5",
    "user6",
    "user7",
    "user8",
  ];

  useEffect(() => {
    dispatch(fetchTaskList());
  }, [dispatch]);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      const html = document.documentElement;
      let innerHeight = window.innerHeight || 0;
      let scrollY = window.scrollY || 0;
      let scrollHeight = html.scrollHeight || 0;
      if (innerHeight + Math.ceil(scrollY) >= scrollHeight) {
        dispatch(scrollToButtom());
      }
    });
  }, [dispatch]);

  return (
    <div className="home-page">
      <div className="navi-section">
        <Navi repoOptions={dammyData} />
      </div>
      <div className="content">
        <div className="taskList-section">
          <div className="add-button">
            <Button class="primary">
              <div>Add</div>
            </Button>
          </div>
          <TaskList
            isLoading={isLoading}
            taskList={taskListData}
            errMsg={errMsg}
          ></TaskList>
        </div>
        <div className="controller-section">
          <Controller />
        </div>
      </div>
    </div>
  );
}
