import React, { useContext, useEffect, useState } from "react";
import "./modal.css";
import { getProductsInStore } from "../../services/product.services";
import ProductCard from "../../Products/ProductCard";
import ProductView from "../../Products/ProductView";
import { LoaderContext } from "../../context/LoaderContext";
import { showDirection } from "../../common/helper";
import "react-toastify/dist/ReactToastify.css";
import { notifySuccess } from "./CustomToasts";

function Modal({ closeModal, store = {}, productId = undefined }) {
  const [showContent, setShowContent] = useState(false);
  const [products, setProducts] = useState([]);
  const [ShowProductData, setShowProductData] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState("");
  const { apiLoader, toggleLoading } = useContext(LoaderContext);

  useEffect(() => {
    setShowContent(true);
    fetchData();
    if (productId) {
      setSelectedProductId(productId);
      setShowProductData(true);
    }
  }, []);

  function selectProduct(productId) {
    setShowProductData(true);
    setSelectedProductId(productId);
  }

  const closeModalOnClick = () => {
    closeModal(false);
  };

  const handleBackClick = () => {
    ShowProductData ? setShowProductData(false) : closeModal(false);
  };

  async function fetchData() {
    try {
      toggleLoading(true);
      const res = await getProductsInStore({ storeId: store.storeId });
      setProducts([...(res?.data || [])]);
    } catch (error) {
    } finally {
      toggleLoading(false);
    }
  }

  return (
    <div className="modal-background" onClick={closeModalOnClick}>
      <div
        className={`modal-container ${showContent && "show-modal"}`}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className={`back-button ${productId && "hidden"}`}
          onClick={handleBackClick}
        >
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <button className="close-button" onClick={closeModalOnClick}>
          <i className="fa-solid fa-x" />
        </button>
        {ShowProductData ? (
          <ProductView selectedProductId={selectedProductId} store={store} />
        ) : (
          <div className="modal-body">
            <div className="store-image-name-container">
              <img className="bg-img blur" src={store?.storeImageURL} alt="" />
              <button
                onClick={() => showDirection(store?.latitude, store?.longitude)}
                className="direction-button"
              >
                <i className="fa-solid fa-location-dot"></i>
              </button>
              <button
                className="call-button"
                onClick={() => {
                  navigator.clipboard.writeText(store?.storePhone);
                  notifySuccess("Copied contact to Clipboard");
                }}
              >
                <i className="fa-solid fa-phone"></i>
              </button>
              <img src={store?.storeImageURL || ""} alt="" />
              <div className="store-name-div gradient-border">
                <p className="store-name">{store?.storeName}</p>
              </div>
            </div>
            <div className="products-container">
              {products.map((p, i) => (
                <ProductCard
                  key={i}
                  product={p}
                  selectProduct={selectProduct}
                />
              ))}
            </div>
            <div className="title"></div>
          </div>
        )}

        <div className="footer"></div>
      </div>
    </div>
  );
}

export default Modal;
