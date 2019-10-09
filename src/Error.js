import React from "react";

const Error = ({ clicked, message }) => {
  if (!clicked || message) {
    return <div className="form-message invalid">{message}</div>;
  }
  return <div className="form-message valid">good</div>;
};

export default Error;
