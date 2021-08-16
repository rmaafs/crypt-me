import React, { useState } from "react";
import "./Button.css";

const Button = (props) => {
  const [loading, setLoading] = useState(false);

  const click = () => {
    setLoading(true);
    if (!loading) {
      props.onClick().finally(() => setLoading(false));
    }
  };

  return (
    <div onClick={loading ? () => {} : click} className="button">
      {loading ? <div className="spinner"></div> : props.children}
    </div>
  );
};

export default Button;
