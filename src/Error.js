import React from "react";

const Error = ({ values, message }) => {
  if (message) {
    return <div className="form-message invalid">{message}</div>;
  } else if (!message && values) {
    return <div className="form-message valid">good</div>;
  } else {
    return false;
  }
};
export default Error;
