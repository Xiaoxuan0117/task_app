import React, { useState } from "react";

import Markdown from "../Markdown";

import "./style.scss";

export default function MarkdownEditor() {
  const [input, setInput] = useState("value");

  return (
    <div className={"markdown-wrapper"}>
      <div className={`content`}>
        <div className="write">
          <div className="tab-wrapper">
            <div className={`write-tab`}>Write</div>
          </div>
          <textarea
            className={`textarea`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          ></textarea>
        </div>
        <div className="preview">
          <div className="tab-wrapper">
            <div className={`preview-tab`}>Preview</div>
          </div>
          <Markdown />
        </div>
      </div>
    </div>
  );
}
