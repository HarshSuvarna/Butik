import React from "react";

function Price({ price }) {
  const pounds = price.split(".")[0];
  const pence = price.split(".")[1];
  return (
    <span className="price">
      &#163;
      <p style={{ fontSize: "15px" }}>{pounds}</p>
      &#x2e;
      <p style={{ fontSize: "11px" }}>{pence || "00"}</p>
    </span>
  );
}

export default Price;
