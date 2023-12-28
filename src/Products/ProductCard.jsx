import React, { useState } from "react";

function ProductCard({ i, product, selectProduct }) {
  return (
    <div
      key={i}
      className="product-card"
      onClick={() => {
        selectProduct(product.productId);
      }}
    >
      {product.productName}
    </div>
  );
}

export default ProductCard;
