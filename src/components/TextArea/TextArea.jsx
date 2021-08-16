import React from "react";
import "./TextArea.css";

const TextArea = ({ onChange }) => {
  return (
    <textarea
      placeholder="Escribe tu texto..."
      onChange={(e) => onChange(e.target.value)}
    ></textarea>
  );
};

export default TextArea;
