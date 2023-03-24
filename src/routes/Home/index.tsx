import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, Outlet, useParams } from "react-router-dom";
import Button from "../../components/atom/Button";
import Navi from "../../components/molecule/Navi";
import Controller from "../../components/organisms/Controller";
import TaskList from "../../components/organisms/TaskList";
import {
  GetTaskList,
  resetTaskList,
  TriggerGetTaskList,
} from "../../reducer/taskList";
import { GetUser } from "../../reducer/user";
import { RootState, useAppDispatch } from "../../store";

import "./style.scss";

export default function Home() {
  const { repo } = useParams();
  const {
    taskList: taskListData,
    isLoading,
    errMsg,
  } = useSelector((state: RootState) => state.taskList);
  const { repoList } = useSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetTaskList());
    getDefaultData();
    async function getDefaultData() {
      await dispatch(GetUser(repo));
      await dispatch(GetTaskList({ reLoad: false }));
    }
  }, [dispatch, repo]);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      const html = document.documentElement;
      let innerHeight = window.innerHeight || 0;
      let scrollY = window.scrollY || 0;
      let scrollHeight = html.scrollHeight || 0;
      if (innerHeight + Math.ceil(scrollY) >= scrollHeight) {
        dispatch(TriggerGetTaskList());
      }
    });
  }, [dispatch]);

  return (
    <div className="home-page">
      <div className="navi-section">
        <Navi repoOptions={repoList} />
      </div>
      <div className="content">
        <div className="taskList-section">
          <div className="head">
            <div className="repo bold">{repo ? repo : "My Issue"}</div>
            <div className="add-button">
              <Link to="/add">
                <Button type="openAddModal" class="primary">
                  <div>New Task</div>
                </Button>
              </Link>
            </div>
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
      <Outlet />
    </div>
  );
}
