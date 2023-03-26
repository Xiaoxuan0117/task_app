import React, { useEffect } from "react";
import Button from "../../atom/Button";

import "./style.scss";

export default function LoginBox() {
  const client_id = process.env.REACT_APP_CLIENT_ID;
  useEffect(() => {
    console.log(client_id);
  }, [client_id]);
  return (
    <div className="login-wrapper">
      <div className="content">
        <div className="title">Login</div>
        <div className="notice">
          Notice !!
          <br />
          After clicking the button below, the system will use the github
          third-party authentication to obtain your github repository, issues
          and other information. <br />
          If you agree, please click the button and continue.
        </div>
        <div className="submit">
          <a
            href={`https://github.com/login/oauth/authorize?client_id=${client_id}&scope=user,repo&state=from`}
          >
            <Button class="primary">
              <div>Github Login</div>
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
