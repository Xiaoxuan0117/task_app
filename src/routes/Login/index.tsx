import React, { useEffect } from "react";
import { useAppDispatch } from "../../store";
import { resetAddIssue } from "../../reducer/addIssue";
import { resetEditIssue } from "../../reducer/editIssue";
import { resetIssueDetail } from "../../reducer/issueDetail";
import { resetIssueList } from "../../reducer/issueList";
import { resetUser } from "../../reducer/user";

import LoginBox from "../../components/molecule/LoginBox";

import "./style.scss";

export default function Login() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetAddIssue());
    dispatch(resetEditIssue());
    dispatch(resetIssueList());
    dispatch(resetIssueDetail());
    dispatch(resetUser());
  });
  return (
    <div className="login-page">
      <LoginBox />
    </div>
  );
}
