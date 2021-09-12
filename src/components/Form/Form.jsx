import React, { Fragment, useState } from "react";
import Button from "../Button/Button";
import Card from "../Card/Card";
import ShareInfo from "../ShareInfo/ShareInfo";
import TextArea from "../TextArea/TextArea";
import server from "../../server.json";
import HelpIcon from "../HelpIcon/HelpIcon";

const Form = () => {
  const [text, setText] = useState("");
  const [jsonResponse, setJsonResponse] = useState(null);

  const sendInfo = () => {
    return new Promise((resolve) => {
      const base64 = Buffer.from(text).toString("base64");

      fetch(server.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: base64 }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.id) setJsonResponse(data);
        })
        .catch(() => resolve(true));
    });
  };

  return (
    <Card>
      {jsonResponse ? (
        <Fragment>
          <h2>Texto encriptado</h2>
          <HelpIcon maxWidth="300px" />
          <ShareInfo data={jsonResponse} onBack={() => setJsonResponse(null)} />
        </Fragment>
      ) : (
        <Fragment>
          <h2>Ingresa tu texto</h2>
          <HelpIcon />

          <TextArea onChange={setText} />
          <Button onClick={sendInfo}>
            <i className="btn-icon fas fa-share-alt" />
            Compartir
          </Button>
        </Fragment>
      )}
    </Card>
  );
};

export default Form;
