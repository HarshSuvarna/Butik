import React from "react";
import "./storeCard.css";

function StoreCard({ setOpenModal, setStore, s }) {
  return (
    <div
      className="store-card"
      onClick={() => {
        setOpenModal(true);
        setStore({ ...s });
      }}
    >
      <img src={s.storeImageURL} alt="" />
      <div className="information-container">
        <span className="card-store-name-type">
          <p className="card-store-name">{s.storeName}</p>
          <p className="card-retailer">{s.wholeSellerOrRetailer}</p>
        </span>
        <span className="card-store-address">
          <p>{s.district || s.sublocality || s.locality}</p>

          <p className="card-store-location">
            {s.state},&nbsp;{s.country}
          </p>
        </span>
        <span className="card-distance-span">
          <p className="card-store-distance">{s.distance.toFixed(1)}</p>
          <p style={{ fontSize: "12px", fontWeight: "bold" }}>&nbsp;km away</p>
        </span>
      </div>
    </div>
  );
}

export default StoreCard;
