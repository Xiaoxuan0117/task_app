import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../atom/Button";
import navi from "../../../assets/instructions_navi.png";
import task from "../../../assets/instructions_task.png";
import controller from "../../../assets/instructions_controller.png";
import button from "../../../assets/instructions_button.png";
import close_white from "../../../assets/close_white.svg";

import "./style.scss";

export default function Instructions() {
  const navigate = useNavigate();
  const instructionsData = [
    {
      title: "Navi",
      context: "",
      img: navi,
      style: "dark",
    },
    {
      title: "Task",
      context:
        "*Only one assignee will be shown here, if you want to know every account to be assigned, you can find it on task detail page.",
      img: task,
    },
    {
      title: "Controller",
      context:
        '*In the "other filter" option, if the system finds no matching task, the filter option will be ignored',
      img: controller,
    },
    {
      title: "Button",
      context: "",
      img: button,
      style: "small",
    },
  ];
  useEffect(() => {
    const body = document.body;
    body.style.overflow = "hidden";

    return () => {
      body.style.overflow = "unset";
    };
  });
  return (
    <div className="instructions-mask">
      <div className="instructions-wrapper">
        <div className="instructions">
          <Button
            type="close"
            onClick={() => {
              navigate(-1);
            }}
            class="close-button"
          >
            <img src={close_white} alt="closeButton" />
          </Button>
          <div className="title">Instructions</div>
          <div className="instructions-content">
            {instructionsData.map((c) => (
              <div key={c.title} className="item">
                <div className="title">{c.title}</div>
                <div className="contect">{c.context}</div>
                <div className={`image-wrapper ${c.style}`}>
                  <img src={c.img} alt="instructions" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
