import React, { useEffect } from "react";
import classNames from "classnames";
import cookie from "js-cookie";
import {
  Link,
  Outlet,
  useNavigate,
  useLocation,
  useParams,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import { selectRepo } from "../../reducer/addTask";
import {
  setShowRepo,
  toggleFilter,
  TriggerGetTaskList,
} from "../../reducer/taskList";
import { GetUser, checkToken } from "../../reducer/user";

import Button from "../../components/atom/Button";
import Navi from "../../components/molecule/Navi";
import Welcome from "../../components/molecule/Welcome";
import Tool from "../../components/molecule/Tool";
import Controller from "../../components/organisms/Controller";
import TaskList from "../../components/organisms/TaskList";
import filter from "../../assets/filter.svg";

import "./style.scss";
import ErrorMessage from "../../components/atom/ErrorMessage";

export default function Home() {
  const navigate = useNavigate();
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
    errMsg: userErrMsg,
    errStatus: userErrStatus,
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
          {userErrStatus !== 200 && (
            <ErrorMessage errStatus={userErrStatus} text={userErrMsg} />
          )}
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
                  <Button
                    class="primary"
                    onClick={() => {
                      navigate("add", { replace: false });
                    }}
                  >
                    <div>New Task</div>
                  </Button>
                </Link>
              </div>
              {!userLoading && (
                <div className="filter-button">
                  <Button
                    class="img-button"
                    onClick={() => {
                      dispatch(toggleFilter());
                    }}
                  >
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
