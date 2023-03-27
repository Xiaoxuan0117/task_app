import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGemoji from "remark-gemoji";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nord } from "react-syntax-highlighter/dist/esm/styles/prism";

import "./style.scss";

type MarkdownProps = {
  children: string;
};

export default function Markdown(prpos: MarkdownProps): JSX.Element {
  return (
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
              style={nord}
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
      {prpos.children}
    </ReactMarkdown>
  );
}
