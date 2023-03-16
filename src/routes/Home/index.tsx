import axios from "axios";
import React, { useEffect } from "react";
import Button from "../../components/atom/Button";
import Navi from "../../components/molecule/Navi";
import Controller from "../../components/organisms/Controller";
import TaskList from "../../components/organisms/TaskList";

import "./style.scss";

export default function Home() {
  const tasksDate = [
    {
      isOpen: false,
      repo: "username/repo",
      repo_url: "https://github.com/xiaoxuan0117/task_app",
      issue: "issue 1",
      issue_url: "https://github.com/xiaoxuan0117/task_app/issues",
      tags: ["Bug", "ToDo"],
      time: "2023-03-08T05:47:16Z",
      creator: "username",
      creator_url: "https://github.com/Xiaoxuan0117",
      assignee_url: "https://github.com/Xiaoxuan0117",
    },
    {
      isOpen: false,
      repo: "username/repo",
      repo_url: "https://github.com/xiaoxuan0117/task_app",
      issue: "issue 1",
      issue_url: "https://github.com/xiaoxuan0117/task_app/issues",
      tags: ["Bug", "In Progress"],
      time: "2023-03-08T05:47:16Z",
      creator: "username",
      creator_url: "https://github.com/Xiaoxuan0117",
      assignee_url: "https://github.com/Xiaoxuan0117",
    },
    {
      isOpen: false,
      repo: "username/repo",
      repo_url: "https://github.com/xiaoxuan0117/task_app",
      issue: "issue 1",
      issue_url: "https://github.com/xiaoxuan0117/task_app/issues",
      tags: ["Bug", "Done"],
      time: "2023-03-08T05:47:16Z",
      creator: "username",
      creator_url: "https://github.com/Xiaoxuan0117",
      assignee_url: "https://github.com/Xiaoxuan0117",
    },
  ];

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
    const fetchData = async () => {
      const getIssue = axios({
        url: "/api/issue",
        method: "get",
      });

      const resDate = await getIssue;
      console.log("resDate", resDate);
    };

    fetchData();
  }, []);
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
          <TaskList tasksData={tasksDate}></TaskList>
        </div>
        <div className="controller-section">
          <Controller />
        </div>
      </div>
    </div>
  );
}
