import React, { useState } from "react";

import ReactMarkdown from "react-markdown";
import remarkGemoji from "remark-gemoji";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { okaidia } from "react-syntax-highlighter/dist/esm/styles/prism";

import "./style.scss";

export default function Markdown() {
  const context: string = `---
  __Advertisement :)__
  
  - __[pica](https://nodeca.github.io/pica/demo/)__ - high quality and fast image
    resize in browser.
  - __[babelfish](https://github.com/nodeca/babelfish/)__ - developer friendly
    i18n with plurals support and easy syntax.
  
  You will like those projects!
  
  ---
  
  # h1 Heading 8-)
  ## h2 Heading
  ### h3 Heading
  #### h4 Heading
  ##### h5 Heading
  ###### h6 Heading
  
  
  ## Horizontal Rules
  
  ___
  `;
  const [input, setInput] = useState(context);

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
  );
}
