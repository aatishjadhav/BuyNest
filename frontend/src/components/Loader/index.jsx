import React from "react";

const Loader = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "70vh" }}
    >
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
