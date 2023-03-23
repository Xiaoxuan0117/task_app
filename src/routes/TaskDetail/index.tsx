import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import LinkElement from "../../components/atom/LinkElement";
import Loading from "../../components/atom/Loading";
import Time from "../../components/atom/Time";
import Comment from "../../components/molecule/Comment";
import Navi from "../../components/molecule/Navi";
import TaskSidebar from "../../components/organisms/TaskSidebar";
import { GetTaskDetail } from "../../reducer/taskDetail";
import { RootState, useAppDispatch } from "../../store";

import "./style.scss";

export default function TaskDetail() {
  let { owner, repo, number } = useParams();
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
    isLoading,
  } = useSelector((state: RootState) => state.taskDetail);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      GetTaskDetail({
        owner: owner || "",
        repo: repo || "",
        number: parseInt(number || "0"),
      })
    );
  }, [dispatch, number, owner, repo]);

  const dummyData = [
    {
      id: 1,
      name: "user1",
    },
    {
      id: 2,
      name: "user2",
    },
    {
      id: 3,
      name: "user3",
    },
    {
      id: 4,
      name: "user4",
    },
    {
      id: 5,
      name: "user5",
    },
    {
      id: 6,
      name: "user6",
    },
  ];

  return (
    <div className="task-page">
      <div className="navi-section">
        <Navi repoOptions={dummyData} />
      </div>
      <div className="task-content">
        {isLoading ? (
          <Loading />
        ) : (
          <div className="header">
            <LinkElement
              isRouter={false}
              class="task"
              href={`https://github.com/${owner}/${repo}`}
            >
              <div className="repo">{repo}</div>
            </LinkElement>
            <LinkElement isRouter={false} class="task" href={issueUrl}>
              <div className="issue">{title}</div>
            </LinkElement>
            <div className="number-and-time">
              <div className="number"># {number}</div>
              <Time utcTime={time} />
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
                  allowEdit={true}
                >
                  {body}
                </Comment>
                {commentsData.map((comment, index) => (
                  <Comment key={comment.id} {...comment}>
                    {comment.children}
                  </Comment>
                ))}
              </div>
              <div className="detail-section">
                <TaskSidebar
                  isOpen={isOpen}
                  labels={labels}
                  milestone={milestone}
                  milestone_url={milestoneUrl}
                  taskInfo={{
                    owner: owner || "",
                    repo: repo || "",
                    number: parseInt(number || "0"),
                  }}
                ></TaskSidebar>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
