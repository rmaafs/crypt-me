import React from "react";
import ClickCopy from "../ClickCopy/ClickCopy";

const ShareInfo = ({ data }) => {
  const id = data.id;
  const secret = data.secret;
  const url = "https://crypt.rmaafs.com/" + id + "/" + secret;

  return (
    <div>
      <ClickCopy text={url} />
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
