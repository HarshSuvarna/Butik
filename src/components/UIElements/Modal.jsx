import React, { useEffect, useState } from "react";
import "./modal.css";
import { getProductsInStore } from "../../services/product.services";
import ProductCard from "../../Products/ProductCard";

function Modal({ closeModal, store }) {
  const [showContent, setShowContent] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setShowContent(true);
    fetchData();
  }, []);

  const closeModalOnClick = (params) => {
    closeModal(false);
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
        <button onClick={closeModalOnClick}> X </button>
        <div className="modal-body">
          <div className="store-image-name-container">
            <img src={store?.storeImageURL || ""} alt="" />
          </div>
          <div className="products-container">
            {products.map((p, i) => (
              <ProductCard i={i} product={p} />
            ))}
          </div>
          <div className="title"></div>
        </div>

        <div className="footer">
          <button onClick={closeModalOnClick}>back</button>{" "}
        </div>
      </div>
    </div>
  );
}

export default Modal;
