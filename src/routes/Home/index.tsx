import React, { useEffect } from "react";
import classNames from "classnames";
import cookie from "js-cookie";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import { selectRepo } from "../../reducer/addTask";
import { setShowRepo, TriggerGetTaskList } from "../../reducer/taskList";
import { GetUser, checkToken } from "../../reducer/user";

import Button from "../../components/atom/Button";
import Navi from "../../components/molecule/Navi";
import Welcome from "../../components/molecule/Welcome";
import Tool from "../../components/molecule/Tool";
import Controller from "../../components/organisms/Controller";
import TaskList from "../../components/organisms/TaskList";
import filter from "../../assets/filter.svg";

import "./style.scss";

export default function Home() {
  const { repoOwner, repoName } = useParams();
  const { search } = useLocation();
  const {
    taskList: taskListData,
    isLoading,
    errMsg,
    errStatus,
    isFilterOpen,
    showRepo,
  } = useSelector((state: RootState) => state.taskList);
  const {
    name,
    repoList,
    isLoading: userLoading,
    token,
  } = useSelector((state: RootState) => state.user);
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

    dispatch(checkToken());

    const abortController = new AbortController();
    const signal = abortController.signal;
    dispatch(GetUser({ signal: signal }));

    return () => {
      abortController.abort();
    };
  }, [search, dispatch, repoOwner, repoName]);

  useEffect(() => {
    if (repoOwner && repoName) {
      dispatch(
        setShowRepo({
          repoOwner: repoOwner,
          repoName: repoName,
        })
      );
      dispatch(selectRepo({ repoName: repoName, repoOwner: repoOwner }));
    } else {
      dispatch(setShowRepo({ repoOwner: name, repoName: "" }));
      dispatch(selectRepo({ repoName: "", repoOwner: "" }));
    }
  }, [dispatch, name, repoName, repoOwner]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    dispatch(TriggerGetTaskList({ signal: signal, firstTime: true }));

    return () => {
      abortController.abort();
    };
  }, [dispatch, repoName, repoOwner]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    function infiniteScroll() {
      const html = document.documentElement;
      let innerHeight = window.innerHeight || 0;
      let scrollY = window.scrollY || 0;
      let scrollHeight = html.scrollHeight || 0;
      if (innerHeight + Math.ceil(scrollY) >= scrollHeight) {
        dispatch(TriggerGetTaskList({ signal: signal, firstTime: false }));
      }
    }

    if (token) {
      window.addEventListener("scroll", infiniteScroll);
    }

    return () => {
      abortController.abort();
      window.removeEventListener("scroll", infiniteScroll);
    };
  }, [dispatch, repoOwner, repoName, token]);

  return (
    <div className="home-page">
      <div className="navi-section">
        <Navi repoOptions={repoList} />
      </div>
      <Tool />
      <div className="content">
        <div className="taskList-section">
          <div className="head">
            <div className="repo bold">
              {showRepo.repoOwner.replace(/[^\w.@:/\-~]+/g, "")}/
              {showRepo.repoName
                ? showRepo.repoName.replace(/[^\w.@:/\-~]+/g, "")
                : "My Tasks"}
            </div>
            <div className="function">
              <div className="add-button">
                <Link to="/add">
                  <Button type="openAddModal" class="primary">
                    <div>New Task</div>
                  </Button>
                </Link>
              </div>
              {!userLoading && (
                <div className="filter-button">
                  <Button type="toggleFilter" class="img-button">
                    <img src={filter} alt="filter" />
                  </Button>
                </div>
              )}
            </div>
          </div>
          <TaskList
            isLoading={isLoading}
            taskList={taskListData}
            errMsg={errMsg}
            errStatus={errStatus}
          ></TaskList>
        </div>
        {!userLoading && (
          <div
            className={`controller-section ${classNames(
              isFilterOpen && "open"
            )}`}
          >
            <Controller />
          </div>
        )}
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
