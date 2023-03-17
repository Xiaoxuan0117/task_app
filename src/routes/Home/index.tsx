import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "../../components/atom/Button";
import Navi from "../../components/molecule/Navi";
import Controller from "../../components/organisms/Controller";
import TaskList from "../../components/organisms/TaskList";
import { TaskProps } from "../../type";

import "./style.scss";

export default function Home() {
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
  const [tasksDate, setTaskData] = useState<TaskProps[]>([]);

  const fetchData = async () => {
    const getIssue = axios({
      url: "/api/issue",
      method: "get",
    });

    try {
      const resData = await getIssue;
      const issueDate: TaskProps[] = resData.data.map(
        (issue: {
          assignee: { avatar_url: string; html_url: string };
          created_at: string;
          html_url: string;
          id: string;
          labels: any[];
          number: number;
          repository: { name: string };
          repository_url: string;
          state: string;
          title: string;
          user: { login: string; html_url: string };
        }) => {
          const {
            assignee: { avatar_url, html_url: assignee_url },
            created_at,
            html_url,
            id,
            labels,
            number,
            repository: { name: repository_name },
            repository_url,
            state,
            title,
            user: { login, html_url: creator_url },
          } = issue;
          const labelsArr = labels.map((label) => label.name);
          return {
            assignee_avatar: avatar_url,
            assignee_url: assignee_url,
            time: created_at,
            issue_url: html_url,
            id,
            labels: labelsArr,
            number,
            repo: repository_name,
            repo_url: repository_url,
            isOpen: state === "open" ? true : false,
            issue: title,
            creator: login,
            creator_url,
          };
        }
      );
      setTaskData(issueDate);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [setTaskData]);

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
