import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import React from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../store";

import Markdown from "../Markdown";

import "./style.scss";

type MarkdownEditorProps = {
  changeEvent: ActionCreatorWithPayload<any, "addTask/setAddBody">;
};

export default function MarkdownEditor(
  props: MarkdownEditorProps
): JSX.Element {
  const { changeEvent } = props;
  const { body } = useSelector((state: RootState) => state.addTask);
  const dispatch = useAppDispatch();

  return (
    <div className={"markdown-wrapper"}>
      <div className={`content`}>
        <div className="write">
          <div className="tab-wrapper">
            <div className={`write-tab`}>Write</div>
          </div>
          <textarea
            className={`textarea`}
            value={body}
            onChange={(e) => {
              dispatch(changeEvent(e.target.value));
            }}
          ></textarea>
        </div>
        <div className="preview">
          <div className="tab-wrapper">
            <div className={`preview-tab`}>Preview</div>
          </div>
          <Markdown>{body}</Markdown>
        </div>
      </div>
    </div>
  );
}
