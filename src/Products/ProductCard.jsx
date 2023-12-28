import React, { useState } from "react";

function ProductCard({ i, product }) {
  const [productData, setProductData] = useState(product);
  const [showProduct, setShowProduct] = useState(false);
  const handleProductClick = () => {
    console.log("p.productName :>> ", product.productName);
    setShowProduct(true);
    console.log("showProduct :>> ", showProduct);
  };
  return (
    <div
      key={i}
      className="product-card"
      onClick={() => {
        handleProductClick(product);
      }}
    >
      {product.productName}
    </div>
  );
}

export default ProductCard;
