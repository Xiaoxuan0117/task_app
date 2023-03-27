import React from "react";
import Markdown from "../Markdown";
import { useAppDispatch } from "../../../store";
import { setAddBody } from "../../../reducer/addTask";
import { setEditBody } from "../../../reducer/editTask";

import "./style.scss";

type MarkdownEditorProps = {
  type: string;
  body: string;
};

export default function MarkdownEditor(
  props: MarkdownEditorProps
): JSX.Element {
  const { type, body } = props;
  const dispatch = useAppDispatch();

  const changeEvent = (type: string, e: string) => {
    switch (type) {
      case "addBody":
        return dispatch(setAddBody(e));
      case "editBody":
        return dispatch(setEditBody(e));
      default:
        return;
    }
  };

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
              changeEvent(type, e.target.value);
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
