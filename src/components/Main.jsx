import React from "react";
import Form from "./Form/Form";
import { Router } from "@reach/router";
import "./Main.css";
import ViewContent from "./ViewContent/ViewContent";
import FishAnimation from "./FishAnimation/FishAnimation";

const Main = () => {
  return (
    <div className="container">
      <FishAnimation />
      <Router>
        <Form path="/" />
        <ViewContent path=":id/:secret" />
      </Router>
    </div>
  );
};

export default Main;
