import { useContext, useEffect, useState } from "react";
import "./stores.css";
import {
  getLocation,
  getNearestStores,
  getNearestStoresByCategory,
  getNearestStoresBySubcategory,
} from "../../services/stores.services";
import { useMyContext } from "../../context/AuthContext";
import Modal from "../UIElements/Modal";
import StoreCard from "../StoreView/StoreCard";
import { LoaderContext } from "../../context/LoaderContext";

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
  const { apiLoader, toggleLoading } = useContext(LoaderContext);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      toggleLoading(true);
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
      } else if (
        window.location.pathname === "/stores" &&
        subcategoryId
      ) {
        res = await getNearestStoresBySubcategory({
          ...req,
          subcategoryId,
        });
      } else {
        res = await getNearestStores(req);
      }
      setStores(res.data);
    } catch (error) {
    } finally {
      toggleLoading(false);
    }
  };

  return (
    <div className="store-parent">
      <p className="store-title">
        {range ? `Stores within ${range} kms` : "Stores Near You!"}
      </p>
      <div className="store-container">
        {stores.length ? (
          stores.map((s, i) => (
            <StoreCard
              setStore={setStore}
              setOpenModal={setOpenModal}
              s={s}
              key={i}
            />
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
    </div>
  );
}

export default Stores;
