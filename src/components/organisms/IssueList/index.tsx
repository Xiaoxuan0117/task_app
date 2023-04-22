import classNames from "classnames";
import React, { useEffect } from "react";
import { useAppDispatch } from "../../../store";
import { IssueListProps } from "../../../type";

import { TriggerGetIssueList } from "../../../reducer/issueList";
import ErrorMessage from "../../atom/ErrorMessage";
import Loading from "../../atom/Loading";
import Issue from "../../molecule/Issue";

import "./style.scss";

export default function IssueList(props: IssueListProps): JSX.Element {
  const { issueList, isLoading, errMsg, errStatus } = props;
  const dispatch = useAppDispatch();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    if (issueList.length !== 0) {
      const issueListElm = document.getElementById("issueList-wrapper");
      const issueListBottomOffset =
        (issueListElm?.offsetHeight || 0) + (issueListElm?.offsetTop || 0);
      const innerHeight = window.innerHeight || 0;
      if (issueListBottomOffset < innerHeight) {
        dispatch(TriggerGetIssueList({ signal: signal, firstTime: false }));
      }
    }

    return () => {
      abortController.abort();
    };
  }, [dispatch, issueList.length]);
  return (
    <div id="issueList-wrapper" className="issueList-wrapper">
      {errMsg && <ErrorMessage text={errMsg} errStatus={errStatus} />}
      <div
        className={`issueList ${classNames(issueList.length && "has-data")}`}
      >
        {issueList.length
          ? issueList.map((issue) => <Issue key={issue.id} {...issue}></Issue>)
          : !isLoading && (
              <div className="empty">
                <i>no issue</i>
              </div>
            )}
      </div>
      {isLoading && <Loading text="Loading" />}
    </div>
  );
}
