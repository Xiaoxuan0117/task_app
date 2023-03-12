import React from "react";
import Button from "../../atom/Button";
import Input from "../../atom/Input";

import "./style.scss";

export default function LoginBox() {
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
          <Button class="primary">
            <div>Submit</div>
          </Button>
        </div>
      </div>
    </div>
  );
}
