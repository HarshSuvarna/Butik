import React, { useEffect, useState } from "react";
import "./modal.css";
import { getProductsInStore } from "../../services/product.services";
import ProductCard from "../../Products/ProductCard";
import ProductView from "../../Products/ProductView";

function Modal({ closeModal, store }) {
  const [showContent, setShowContent] = useState(false);
  const [products, setProducts] = useState([]);
  const [ShowProductData, setShowProductData] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState("");

  useEffect(() => {
    setShowContent(true);
    fetchData();
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
      const res = await getProductsInStore({ storeId: store.storeId });
      setProducts([...(res?.data || [])]);
    } catch (error) {}
  }

  return (
    <div className="modal-background" onClick={closeModalOnClick}>
      <div
        className={`modal-container ${showContent && "show-modal"}`}
        onClick={(event) => event.stopPropagation()}
      >
        <button className="close-button" onClick={closeModalOnClick}>
          {" "}
          X{" "}
        </button>
        {ShowProductData ? (
          <ProductView selectedProductId={selectedProductId} />
        ) : (
          <div className="modal-body">
            <div className="store-image-name-container">
              <img src={store?.storeImageURL || ""} alt="" />
              <p className="store-name">{store?.storeName}</p>
            </div>
            <div className="products-container">
              {products.map((p, i) => (
                <ProductCard i={i} product={p} selectProduct={selectProduct} />
              ))}
            </div>
            <div className="title"></div>
          </div>
        )}

        <div className="footer">
          <button onClick={handleBackClick}>back</button>{" "}
        </div>
      </div>
    </div>
  );
}

export default Modal;
