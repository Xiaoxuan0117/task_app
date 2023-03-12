import * as React from "react";
import Avatar from "../../atom/Avatar";
import avatar from "../../../assets/avatar.png";
import editButton from "../../../assets/editButton.svg";
import LinkElement from "../../atom/LinkElement";
import Time from "../../atom/Time";
import Button from "../../atom/Button";
import Markdown from "../../atom/Markdown";

import "./style.scss";

type ICommentProps = {
  children: string;
};

export default function Comment(props: ICommentProps): JSX.Element {
  const context: string = `__Advertisement :)__\r\n\r\n- __[pica](https://nodeca.github.io/pica/demo/)__ - high quality and fast image\r\n  resize in browser.\r\n- __[babelfish](https://github.com/nodeca/babelfish/)__ - developer friendly\r\n  i18n with plurals support and easy syntax.\r\n\r\nYou will like those projects!\r\n\r\n---\r\n\r\n# h1 Heading 8-)\r\n## h2 Heading\r\n### h3 Heading\r\n#### h4 Heading\r\n##### h5 Heading\r\n###### h6 Heading\r\n\r\n\r\n## Horizontal Rules\r\n\r\n___\r\n
`;
  return (
    <div className="comment">
      <div className="avatar-wrapper">
        <Avatar
          image={avatar}
          class="member"
          href="https://github.com/Xiaoxuan0117"
        />
      </div>
      <div className="content">
        <div className="info">
          <div className="left">
            <LinkElement isRouter={false} class="task">
              <div className="username">username</div>
            </LinkElement>
            <Time utcTime="2023-03-08T05:47:16Z" />
          </div>
          <div className="right">
            <Button class="edit">
              <img src={editButton} alt="editButton" />
            </Button>
          </div>
        </div>
        <div className="context-wrapper">
          <Markdown>{props.children}</Markdown>
        </div>
      </div>
    </div>
  );
}
