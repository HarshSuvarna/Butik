import { useEffect, useState } from "react";
import "./stores.css";
import {
  getLocation,
  getNearestStores,
  getNearestStoresByCategory,
  getNearestStoresBySubcategory,
} from "../../services/stores.services";
import { useMyContext } from "../../context/AuthContext";
import Modal from "../UIElements/Modal";

function Stores({
  categoryId = undefined,
  subcategoryId = undefined,
  range = 50,
}) {
  const [stores, setStores] = useState([]);
  const { contextValues } = useMyContext();
  const [userData, setUserData] = useState({ ...contextValues.auth });
  const [openModal, setOpenModal] = useState(false);
  const [store, setStore] = useState({});
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      let latitude = userData.latitude;
      let longitude = userData.longitude;
      let res;
      if (!latitude || !longitude) {
        const location = await getLocation();
        latitude = location.latitude;
        longitude = location.longitude;
      }
      let req = {
        latitude: userData?.latitude || location?.latitude || 55.8319,
        longitude: userData?.longitude || location?.longitude || -4.4322,
        max_kms: 10000, // Change THISSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
      };
      if (window.location.pathname === "/stores" && categoryId) {
        res = await getNearestStoresByCategory({ ...req, categoryId });
      } else if (window.location.pathname === "/stores" && subcategoryId) {
        res = await getNearestStoresBySubcategory({
          ...req,
          subcategoryId,
        });
      } else {
        res = await getNearestStores(req);
      }
      setStores(res.data);
    } catch (error) {}
  };

  return (
    <div className="store-container">
      {stores.length ? (
        stores.map((s) => (
          <div
            key={s.storeId}
            className="store-card"
            onClick={() => {
              setOpenModal(true);
              setStore({ ...s });
            }}
          >
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
        ))
      ) : (
        <span
          style={{
            position: "absolute",
            top: "15rem",
            left: "27em",
            fontWeight: "600",
          }}
        >
          No Stores found
          <p>Increase the range</p>
        </span>
      )}

      {openModal && (
        <Modal closeModal={setOpenModal} store={store}>
          asdfasdfasdf
        </Modal>
      )}
    </div>
  );
}

export default Stores;
