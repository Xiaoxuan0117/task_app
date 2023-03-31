import React, { useEffect } from "react";
import classNames from "classnames";
import { Outlet, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import { GetTaskDetail } from "../../reducer/taskDetail";
import { checkToken, GetUser } from "../../reducer/user";
import { setShowRepo } from "../../reducer/taskList";

import ErrorMessage from "../../components/atom/ErrorMessage";
import LinkElement from "../../components/atom/LinkElement";
import Loading from "../../components/atom/Loading";
import Time from "../../components/atom/Time";
import Comment from "../../components/molecule/Comment";
import Navi from "../../components/molecule/Navi";
import Tool from "../../components/molecule/Tool";
import TaskSidebar from "../../components/organisms/TaskSidebar";

import "./style.scss";

export default function TaskDetail() {
  let { repoOwner, repoName, number } = useParams();
  const {
    body,
    time,
    issueUrl,
    id,
    labels,
    isOpen,
    title,
    creator,
    creatorUrl,
    creatorAvatar,
    commentsData,
    milestone,
    milestoneUrl,
    assignees,
    isLoading,
    errMsg,
    errStatus,
    isDetailOpen,
  } = useSelector((state: RootState) => state.taskDetail);
  const { name: user, repoList } = useSelector(
    (state: RootState) => state.user
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    dispatch(GetUser({ signal: signal }));

    return () => {
      dispatch(checkToken());
      abortController.abort();
    };
  }, [dispatch]);

  useEffect(() => {
    if (repoOwner && repoName) {
      dispatch(
        setShowRepo({
          repoOwner: repoOwner,
          repoName: repoName,
        })
      );
    }
  }, [dispatch, repoName, repoOwner]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    dispatch(checkToken());
    dispatch(
      GetTaskDetail({
        repoOwner: repoOwner || "",
        repoName: repoName || "",
        number: parseInt(number || "0"),
        signal: signal,
      })
    );

    return () => {
      abortController.abort();
    };
  }, [dispatch, number, repoOwner, repoName]);

  return (
    <div className="task-page">
      <div className="navi-section">
        <Navi repoOptions={repoList} />
      </div>
      <Tool />
      <div className="task-content">
        <div className="task-flex">
          {isLoading && <Loading text="Loading" />}
          {!errMsg && time && !isLoading && (
            <div className="detail">
              <div className="header">
                <LinkElement
                  isRouter={false}
                  class="task"
                  href={`https://github.com/${repoOwner}/${repoName}`}
                >
                  <div className="repo">{repoName}</div>
                </LinkElement>
                <LinkElement isRouter={false} class="task" href={issueUrl}>
                  <div className="issue">{title}</div>
                </LinkElement>
                <div className="number-and-time">
                  <div className="number"># {number}</div>
                  <Time utcTime={time} />
                </div>
              </div>
              <div className="divide"></div>
              <div className="task-data">
                <div className="comment-section">
                  <Comment
                    key={id}
                    id={id}
                    avatar={creatorAvatar}
                    username={creator}
                    user_url={creatorUrl}
                    created_at={time}
                    allowEdit={user === creator}
                    isBody={true}
                  >
                    {body}
                  </Comment>
                  {commentsData.map((comment, index) => (
                    <Comment key={comment.id} {...comment}>
                      {comment.children}
                    </Comment>
                  ))}
                </div>
                <div
                  className={`detail-section ${classNames(
                    isDetailOpen && "open"
                  )}`}
                >
                  <TaskSidebar
                    isOpen={isOpen}
                    labels={labels}
                    milestone={milestone}
                    milestone_url={milestoneUrl}
                    assignees={assignees || []}
                    taskInfo={{
                      repoOwner: repoOwner || "",
                      repoName: repoName || "",
                      number: parseInt(number || "0"),
                    }}
                  ></TaskSidebar>
                </div>
              </div>
            </div>
          )}
          {errMsg && <ErrorMessage text={errMsg} errStatus={errStatus} />}
        </div>
      </div>
      <Outlet />
    </div>
  );
}
