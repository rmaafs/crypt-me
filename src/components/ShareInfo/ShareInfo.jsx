import React from "react";
import ClickCopy from "../ClickCopy/ClickCopy";

const ShareInfo = ({ data }) => {
  const id = data.id;
  const secret = data.secret;
  const url = window.location.href + id + "/" + secret;

  return (
    <div>
      <ClickCopy
        text={url}
        label="Pulsa aquí para copiar el link para desencriptar"
      />
      <br />
      <br />
      <div>
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
