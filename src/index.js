import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<App />, document.getElementById("root"));

// eslint-disable-next-line no-console
console.log(
  "\n\n%c¡Hola desarrollador!\n\nConsulta el código fuente en\nhttps://github.com/rmaafs/crypt-me \n\n%cAPI REST en Postman:\nhttps://documenter.getpostman.com/view/9525350/U16krkhd \n\n\n",
  "color:aqua",
  "color:orange"
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
