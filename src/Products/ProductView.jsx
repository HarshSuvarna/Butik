import React, { useContext, useEffect, useState } from "react";
import { getDetailedProductData } from "../services/product.services";
import "./product-view.css";
import Price from "../components/UIElements/Price";
import { LoaderContext } from "../context/LoaderContext";
import { showDirection } from "../common/helper";
import { notifySuccess } from "../components/UIElements/CustomToasts";

function ProductView({ selectedProductId, store }) {
  const [product, setProduct] = useState();
  const [sellerData, setSellerData] = useState({});
  const [variantList, setVariantList] = useState([]);
  const [variant, setVariant] = useState({});
  const [selectedVariant, setSelectedVariant] = useState({});
  const [sizePriceList, setSizePriceList] = useState([]);
  const [selectedSizePrice, setSelectedSizePrice] = useState({});
  const [imagesUrlList, setImagesUrlList] = useState([]);
  const [selectedImage, setSelectedImage] = useState();
  const { apiLoader, toggleLoading } = useContext(LoaderContext);

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

  useEffect(() => {}, [sellerData]);

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
      toggleLoading(true);
      const res = await getDetailedProductData({
        productId: selectedProductId,
      });
      setProduct({ ...res?.data?.product_details });
      setVariantList([...res?.data?.variantList]);
      setVariant({ ...variantList[0] });
      setSellerData({ ...res?.data?.seller_details });
    } catch (error) {
    } finally {
      toggleLoading(false);
    }
  };

  return (
    <div className="product-container">
      <div className="product-store-info">
        <div className="variant-images-selecter">
          {(imagesUrlList || []).map((image, i) => (
            <div key={i} className="variant-image-container">
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
          <div className="product-category-container">
            <p>{product?.categoryName}</p>
            <p>{product?.subcategoryName}</p>
          </div>
          <div className="name-description-container">
            <p className="product-name">{product?.productName}</p>
            <p>{product?.productDescription}</p>
          </div>
          <div style={{ width: "100%" }}>
            <p style={{ margin: "0", fontSize: "12px" }}>Colour</p>
            <div className="color-variants">
              {(variantList || []).map((v, i) => (
                <p
                  className={`color-variants-span ${
                    v?.variantId === selectedVariant?.variantId && "selected"
                  }`}
                  onClick={() => selectVariant(v)}
                  key={i}
                >
                  {v?.color || ""}
                </p>
              ))}
            </div>
          </div>
          <div>
            <p style={{ margin: "0", fontSize: "12px", marginBottom: "13px" }}>
              Size
            </p>
            <div className="size-container">
              {(sizePriceList || []).map((sp, i) => (
                <div
                  className={`sizes ${
                    sp?.spqId === selectedSizePrice?.spqId && "selected"
                  }`}
                  onClick={() => selectSizePrice(sp)}
                  key={i}
                >
                  <p>{sp?.size}</p>
                </div>
              ))}
            </div>
          </div>
          <Price
            size={"30px"}
            weight={"100"}
            price={selectedSizePrice?.price?.toString() || "0.00"}
          />
        </div>
      </div>
      <div className="store-info">
        <p>{store?.storeName || sellerData?.storeName}</p>
        <button
          onClick={() =>
            showDirection(
              store?.latitude || sellerData?.latitude,
              store?.longitude || sellerData?.longitude
            )
          }
          className="direction-buttons"
        >
          <i className="fa-solid fa-location-dot"></i>
        </button>
        <button
          className="call-buttons"
          onClick={() => {
            navigator.clipboard.writeText(
              store?.storePhone || sellerData?.storePhone
            );
            notifySuccess("Copied contact to Clipboard");
          }}
        >
          <i className="fa-solid fa-phone"></i>
        </button>
      </div>
    </div>
  );
}

export default ProductView;
