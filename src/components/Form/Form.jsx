import React, { Fragment, useState } from "react";
import Button from "../Button/Button";
import Card from "../Card/Card";
import ShareInfo from "../ShareInfo/ShareInfo";
import TextArea from "../TextArea/TextArea";

const Form = () => {
  const json = {
    id: "6119f1d3c809b3dcf08676a3",
    secret: "0952ce55db72294e07eb983673d8287e",
    end: 1629176659066,
  };

  const [text, setText] = useState("");
  const [jsonResponse, setJsonResponse] = useState(json);

  const sendInfo = () => {
    return new Promise((resolve, reject) => {
      const base64 = Buffer.from(text).toString("base64");
      console.log(base64);

      if (json.id) {
        setJsonResponse(json);
      }

      setTimeout(function () {
        if (true) {
          resolve(true);
        } else {
          reject(false);
        }
      }, 1000);
    });
  };

  return (
    <Card>
      {jsonResponse ? (
        <Fragment>
          <h2>Texto encriptado</h2>
          <ShareInfo data={jsonResponse} />
        </Fragment>
      ) : (
        <Fragment>
          <h2>Ingresa tu texto</h2>
          <TextArea onChange={setText} />
          <Button onClick={sendInfo}>Enviar</Button>
        </Fragment>
      )}
    </Card>
  );
};

export default Form;
