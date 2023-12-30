import React, { useEffect, useState } from "react";
import { getDetailedProductData } from "../services/product.services";
import "./product-view.css";
import Price from "../components/UIElements/Price";

function ProductView({ selectedProductId }) {
  const [product, setProduct] = useState();
  const [sellerData, setSellerData] = useState({});
  const [variantList, setVariantList] = useState([]);
  const [variant, setVariant] = useState({});
  const [selectedVariant, setSelectedVariant] = useState();
  const [sizePriceList, setSizePriceList] = useState([]);
  const [selectedSizePrice, setSelectedSizePrice] = useState({});
  const [imagesUrlList, setImagesUrlList] = useState([]);
  const [selectedImage, setSelectedImage] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (variantList.length > 0) {
      setVariant({ ...(variantList[0] || {}) });
      setSizePriceList([...(variantList[0]?.spqList || [])]);
      setSelectedSizePrice({ ...(variantList[0]?.spqList?.[0] || {}) });
      setImagesUrlList([...(variantList[0]?.imagesUrlList || [])]);
      setSelectedImage(variantList[0]?.imagesUrlList?.[0] || "");
    }
  }, [variantList]);

  useEffect(() => {
    setSizePriceList([...(selectedVariant?.spqList || [])]);
    setImagesUrlList([...(selectedVariant?.imagesUrlList || [])]);
    setSelectedImage(selectedVariant?.imagesUrlList?.[0] || "");
  }, [selectedVariant]);

  const selectSizePrice = (sp) => {
    setSelectedSizePrice({
      ...sp,
    });
  };
  useEffect(() => {
    setSelectedSizePrice({ ...(sizePriceList?.[0] || {}) });
  }, [sizePriceList]);

  const selectVariant = (variant) => {
    setSelectedVariant({ ...variant });
  };

  const fetchData = async () => {
    try {
      const res = await getDetailedProductData({
        productId: selectedProductId,
      });
      setProduct({ ...res?.data?.product_details });
      setVariantList([...res?.data?.variantList]);
      setVariant({ ...variantList[0] });
      setSizePriceList([...variantList[0].spqList]);
      setSellerData({ ...res?.data?.seller_details });
    } catch (error) {}
  };

  return (
    <div className="product-container">
      <div className="variant-images-selecter">
        {(imagesUrlList || []).map((image) => (
          <div className="variant-image-container">
            <img
              src={image}
              alt=""
              className={`variant-image ${
                image === selectedImage && "image-transparency"
              }`}
              onClick={() => setSelectedImage(image)}
            />
          </div>
        ))}
      </div>
      <div className="product-variant-image">
        <img src={selectedImage} alt="" />
      </div>
      <div className="product-variant-details">
        <p>{product?.productName}</p>
        <p>{product?.productDescription}</p>
        <Price price={selectedSizePrice?.price?.toString() || "0.00"} />
        <p>{selectedSizePrice?.price || 0.0}</p>
        <div className="color-variants">
          {(variantList || []).map((v, i) => (
            <>
              <p onClick={() => selectVariant(v)} key={i}>
                {v?.color || ""}
              </p>
            </>
          ))}
        </div>

        <div className="size-container">
          {(sizePriceList || []).map((sp, i) => (
            <p onClick={() => selectSizePrice(sp, i)} key={i}>
              {sp?.size}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductView;
