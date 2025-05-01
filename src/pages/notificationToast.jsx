import React from "react";
import "../styles/toast.css";

const Toast = ({ message, show }) => {
  return (
    <div className={`toast ${show ? "show" : ""}`}>
      {message}
    </div>
  );
};

export default Toast;
