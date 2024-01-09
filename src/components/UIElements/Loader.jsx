import "./loader.css";
// import React from "react";

export const Loader = ({ dim }) => {
  return (
    <span
      style={{ height: dim || "24px", width: dim || "24px" }}
      className="loader"
    />
  );
};

// export default Loader;
