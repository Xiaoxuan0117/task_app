import React from "react";

import LinkElement from "../../components/atom/LinkElement";
import Navi from "../../components/molecule/Navi";

import "./style.scss";

export default function Error() {
  return (
    <div className="error-page">
      <div className="navi-section">
        <Navi repoOptions={[]} />
      </div>
      <div className="error-section">
        <div className="content">
          <div className="title">404</div>
          <div className="context">Not Found</div>
          <LinkElement isRouter={true} href="/" class="issue">
            <div className="repo">Back to Home Page</div>
          </LinkElement>
        </div>
      </div>
    </div>
  );
}
