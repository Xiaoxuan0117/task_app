import React, { useState } from "react";

import ReactMarkdown from "react-markdown";
import remarkGemoji from "remark-gemoji";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { okaidia } from "react-syntax-highlighter/dist/esm/styles/prism";

import "./style.scss";

export default function Markdown() {
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
          <ReactMarkdown
            className={`markdown`}
            rehypePlugins={[rehypeRaw]}
            remarkPlugins={[remarkGemoji, remarkGfm]}
            components={{
              code({ node, inline, className, children, style, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <SyntaxHighlighter
                    children={String(children).replace(/\n$/, "")}
                    style={okaidia}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  />
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {input}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
