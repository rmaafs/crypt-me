import { reject } from "q";
import React from "react";
import Button from "../Button/Button";
import Card from "../Card/Card";
import TextArea from "../TextArea/TextArea";

const Form = () => {
  const sendInfo = () => {
    return new Promise((resolve, reject) => {
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
      <TextArea />
      <Button onClick={sendInfo}>Enviar</Button>
    </Card>
  );
};

export default Form;
