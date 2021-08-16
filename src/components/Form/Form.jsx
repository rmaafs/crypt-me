import React, { useState } from "react";
import Button from "../Button/Button";
import Card from "../Card/Card";
import TextArea from "../TextArea/TextArea";

const Form = () => {
  const [text, setText] = useState("");

  const sendInfo = () => {
    return new Promise((resolve, reject) => {
      const base64 = Buffer.from(text).toString("base64");
      console.log(base64);

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
      <h2>Ingresa tu texto</h2>
      <TextArea onChange={setText} />
      <Button onClick={sendInfo}>Enviar</Button>
    </Card>
  );
};

export default Form;
