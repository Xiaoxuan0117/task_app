import React, { useEffect } from "react";
import Button from "../../atom/Button";
import Input from "../../atom/Input";

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
        <div className="input-wrapper">
          <div className="label">username</div>
          <Input class="login"></Input>
        </div>
        <div className="input-wrapper">
          <div className="label">password</div>
          <Input class="login"></Input>
        </div>
        <div className="submit">
          <a
            href={`https://github.com/login/oauth/authorize?client_id=${client_id}&scope=user:email&state=from`}
          >
            <Button class="primary">
              <div>Submit</div>
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
