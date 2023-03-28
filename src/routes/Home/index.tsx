import React, { useEffect } from "react";
import classNames from "classnames";
import cookie from "js-cookie";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import { resetAddTask } from "../../reducer/addTask";
import {
  checkToken,
  GetTaskList,
  resetTaskList,
  TriggerGetTaskList,
} from "../../reducer/taskList";
import { GetUser } from "../../reducer/user";

import Button from "../../components/atom/Button";
import Navi from "../../components/molecule/Navi";
import Profile from "../../components/molecule/Profile";
import Welcome from "../../components/molecule/Welcome";
import Controller from "../../components/organisms/Controller";
import TaskList from "../../components/organisms/TaskList";
import filter from "../../assets/filter.svg";
import logout from "../../assets/logout.svg";

import "./style.scss";

export default function Home() {
  const { repoOwner, repoName } = useParams();
  const { search } = useLocation();
  const {
    taskList: taskListData,
    isLoading,
    errMsg,
    isFilterOpen,
    token,
  } = useSelector((state: RootState) => state.taskList);
  const { repoList, showRepo } = useSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const query = new URLSearchParams(search);
    const access_token = query.get("access_token");
    if (access_token) {
      cookie.set("access_token", access_token, {
        expires: 1,
        secure: true,
        sameSite: "None",
      });
      window.location.href = "/";
    }
  }, [search, dispatch]);

  useEffect(() => {
    dispatch(checkToken());
    if (token) {
      dispatch(resetTaskList());
      dispatch(resetAddTask());
      dispatch(checkToken());
      getDefaultData();
    }
    async function getDefaultData() {
      await dispatch(
        GetUser({ repoOwner: repoOwner || "", repoName: repoName || "" })
      );
      await dispatch(GetTaskList({ reLoad: false }));
    }
  }, [dispatch, repoOwner, repoName, token]);

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
      <div className="profile-section">
        <Profile />
        <Button class="logout-button" type="logout">
          <img src={logout} alt="closeButton" />
        </Button>
      </div>
      <div className="content">
        <div className="taskList-section">
          <div className="head">
            <div className="repo bold">
              {showRepo.repoOwner}/
              {showRepo.repoName ? showRepo.repoName : "My Tasks"}
            </div>
            <div className="function">
              <div className="add-button">
                <Link to="/add">
                  <Button type="openAddModal" class="primary">
                    <div>New Task</div>
                  </Button>
                </Link>
              </div>
              <div className="filter-button">
                <Button type="toggleFilter" class="img-button">
                  <img src={filter} alt="filter" />
                </Button>
              </div>
            </div>
          </div>
          <TaskList
            isLoading={isLoading}
            taskList={taskListData}
            errMsg={errMsg}
          ></TaskList>
        </div>
        <div
          className={`controller-section ${classNames(isFilterOpen && "open")}`}
        >
          <Controller />
        </div>
      </div>
      <Outlet />
      {!token && (
        <div className="welcome-section">
          <Welcome />
        </div>
      )}
    </div>
  );
}
