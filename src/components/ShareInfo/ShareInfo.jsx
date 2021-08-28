import React from "react";
import ClickCopy from "../ClickCopy/ClickCopy";
import "./ShareInfo.css";

const ShareInfo = ({ data }) => {
  const id = data.id;
  const secret = data.secret;
  const url = window.location.href + id + "/" + secret;

  return (
    <div className="share-info">
      <ClickCopy
        text={url}
        label="Pulsa aquí para copiar el link para desencriptar"
        icon="fas fa-clipboard"
      />
      <br />
      <br />
      <div className="share-info-text">
        <b>ID:</b>
        <br />
        {id}
        <br />
        <br />
        <b>Secret:</b>
        <br />
        {secret}
      </div>
    </div>
  );
};

export default ShareInfo;
