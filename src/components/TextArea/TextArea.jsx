import React from "react";
import "./TextArea.css";

const TextArea = ({ onChange, disabled, defaultText }) => {
  return (
    <textarea
      placeholder="Escribe tu texto..."
      disabled={disabled || false}
      onChange={(e) => onChange && onChange(e.target.value)}
      defaultValue={defaultText || ""}
    ></textarea>
  );
};

export default TextArea;
