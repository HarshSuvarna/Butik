import React, { useEffect, useState } from "react";
import { getDetailedProductData } from "../services/product.services";

function ProductView({ selectedProductId }) {
  const [product, setProduct] = useState();
  const [variantList, setVariantList] = useState([]);
  const [sellerData, setSellerData] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await getDetailedProductData({
        productId: selectedProductId,
      });
      setProduct({ ...res?.data?.product_details });
      setVariantList([...res?.data?.variantList]);
      setSellerData({ ...res?.data?.seller_details });
    } catch (error) {}
  };

  return (
    <div>
      {product?.productName}
      {variantList[0]?.categoryName}
    </div>
  );
}

export default ProductView;
