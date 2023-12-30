import React, { useState } from "react";
import "./product-card.css";
import Price from "../components/UIElements/Price";

function ProductCard({ i, product, selectProduct }) {
  const price = product?.priceMin?.toString() || "0.00";
  return (
    <div
      key={i}
      className="product-card"
      onClick={() => {
        selectProduct(product.productId);
      }}
    >
      <div className="image-container">
        <img src={product?.productImageUrl} alt="" />
      </div>
      <div className="product-info">
        <span className="name-price">
          <p style={{ fontWeight: "bold" }}>{product?.productName}</p>
          <Price price={price} />
        </span>
        <p className="product-description" style={{ fontSize: "12px" }}>
          {product?.productDescription || ""}
        </p>
      </div>
    </div>
  );
}

export default ProductCard;
