import React, { useEffect } from "react";
import { useAppDispatch } from "../../store";
import { resetAddTask } from "../../reducer/addTask";
import { resetEditTask } from "../../reducer/editTask";
import { resetTaskDetail } from "../../reducer/taskDetail";
import { resetTaskList } from "../../reducer/taskList";
import { resetUser } from "../../reducer/user";

import LoginBox from "../../components/molecule/LoginBox";

import "./style.scss";

export default function Login() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetAddTask());
    dispatch(resetEditTask());
    dispatch(resetTaskList());
    dispatch(resetTaskDetail());
    dispatch(resetUser());
  });
  return (
    <div className="login-page">
      <LoginBox />
    </div>
  );
}
