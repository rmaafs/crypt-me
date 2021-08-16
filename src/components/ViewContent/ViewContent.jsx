import React, { useEffect, useState } from "react";
import Card from "../Card/Card";
import TextArea from "../TextArea/TextArea";
import server from "../../server.json";

const ViewContent = ({ id, secret }) => {
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState(null);
  const [title, setTitle] = useState("Cargando...");

  const fetchData = () => {
    return new Promise((resolve, reject) => {
      fetch(server.url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id, secret: secret }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.text) {
            const decrypted = Buffer(data.text, "base64").toString("ascii");
            setText(decrypted);
          } else if (data.error) {
            setTitle(data.error);
          }
        })
        .finally(() => {
          resolve(true);
          setLoading(false);
        });
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Card>
      <h2>{title}</h2>
      {!loading && text !== null ? (
        <TextArea disabled={true} defaultText={text} />
      ) : null}
      ID: {id}
      <br />
      secret: {secret}
    </Card>
  );
};

export default ViewContent;
