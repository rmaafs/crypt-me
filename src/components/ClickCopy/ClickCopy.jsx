import React, { useState } from "react";
import "./ClickCopy.css";

const ClickCopy = ({ text }) => {
  const [copiado, setCopiado] = useState(false);

  const copyClipboard = () => {
    var input = document.createElement("textarea");
    input.innerHTML = text;
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    document.body.removeChild(input);
    setCopiado(true);
  };

  return !copiado ? (
    <span onClick={copyClipboard} className="click-copy">
      Pulsa aquí para copiar el link para desencriptar
    </span>
  ) : (
    <span className="click-copy-copiado">¡Copiado!</span>
  );
};

export default ClickCopy;
