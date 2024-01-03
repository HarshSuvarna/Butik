import React from "react";

function Price({ price, size, weight }) {
  const pounds = price.split(".")[0];
  const pence = price.split(".")[1];
  return (
    <span className="price">
      <p style={{ fontSize: size || "15px", fontWeight: weight || "100" }}>
        &#163;
      </p>
      <p style={{ fontSize: size || "15px", fontWeight: weight || "100" }}>
        {pounds}
      </p>
      &#x2e;
      <p style={{ fontSize: size || "11px", fontWeight: weight || "100" }}>
        {pence || "00"}
      </p>
    </span>
  );
}

export default Price;
