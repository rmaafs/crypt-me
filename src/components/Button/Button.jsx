import React from "react";
import "./Button.css";

const Button = (props) => {
  return (
    <div onClick={props.onClick} className="button">
      {props.children}
    </div>
  );
};

export default Button;
