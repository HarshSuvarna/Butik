import { useEffect, useState } from "react";
import "./stores.css";
import { getLocation, getNearestStores } from "../../services/stores.services";

function Stores() {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      console.log("sherheh");
      const location = await getLocation();
      const res = await getNearestStores({
        latitude: location.latitude,
        longitude: location.longitude,
        max_kms: 10000,
      });
      setStores(res.data);
    } catch (error) {}
  };

  return (
    <div className="store-container">
      {stores.map((s) => (
        <div key={s.storeId} className="store-card">
          <img src={s.storeImageURL} alt="" />
          <div className="information-container">
            <span style={{ display: "flex", alignItems: "center" }}>
              <p
                style={{
                  fontWeight: "600",
                  textTransform: "uppercase",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
              >
                {s.storeName}
              </p>
              <p
                style={{
                  fontSize: "11px",
                  fontWeight: "600",
                  color: "gray",
                  marginLeft: "5px",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
              >
                {s.wholeSellerOrRetailer}
              </p>
            </span>
            <p>{s.district || s.sublocality || s.locality}</p>

            <p
              style={{
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              {s.state},&nbsp;{s.country}
            </p>
            <p
              style={{
                fontWeight: "600",
                fontSize: "12px",
                color: "green",
                position: "absolute",
                bottom: "1px",
                right: "10px",
              }}
            >
              {s.distance.toFixed(1)} KM
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Stores;
