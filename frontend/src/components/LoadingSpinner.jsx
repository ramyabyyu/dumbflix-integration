import React from "react";
import { Spinner } from "react-bootstrap";

const LoadingSpinner = ({ size }) => {
  let styles;

  if (size === "big") {
    styles = {
      opacity: "0.6",
      width: "10rem",
      height: "10rem",
      borderWidth: "1.2rem",
    };
  } else if (size === "inherit") {
    styles = {
      opacity: "0.6",
    };
  }

  return (
    <div className="d-flex justify-content-center align-items-center mt-5">
      <Spinner animation="border" variant="danger" style={styles} />
    </div>
  );
};

export default LoadingSpinner;
