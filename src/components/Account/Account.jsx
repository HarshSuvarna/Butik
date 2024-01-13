import { useContext, useEffect, useState } from "react";
import { useMyContext } from "../../context/AuthContext";
import "./Account.css";
import { getAllGenders } from "../../services/attributes.services";
import { makeSeller, updateUser } from "../../services/user.services";
import { Loader } from "../UIElements/Loader";
import { LoaderContext } from "../../context/LoaderContext";
import { notifyError, notifyInfo } from "../UIElements/CustomToasts";

function Account() {
  const { contextValues, updateContextValue } = useMyContext();
  const [userData, setUserData] = useState({ ...contextValues.auth });
  const [genders, setGenders] = useState([]);
  const [loader, setLoading] = useState(false);
  const { apiLoader, toggleLoading } = useContext(LoaderContext);

  useEffect(() => {
    fetchData();
    setUserData({ ...contextValues.auth });
  }, []);
  const fetchData = async () => {
    try {
      toggleLoading(true);
      const res = await getAllGenders({
        genderNames: [],
      });
      setGenders([...res?.data]);
    } catch (error) {
    } finally {
      toggleLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      let res = await updateUser({ ...userData });
      updateContextValue("auth", res?.data || userData);
      setLoading(false);
      notifyInfo("User info updated Successfully");
    } catch (e) {
      console.log(e?.message || e?.error || e);
    } finally {
      notifyError("User info not Updated");
      toggleLoading(false);
    }
  };

  const makeUserSeller = async () => {
    try {
      toggleLoading(true);
      const res = await makeSeller({ uid: userData.uid });
      setUserData({ ...userData, isSeller: true });
    } catch (e) {
      console.log(e?.message || e?.error || e);
    } finally {
      toggleLoading(false);
    }
  };

  return (
    <div className="account-container">
      <img src="images/account.jpg" alt="" />
      <div className="user-info">
        <div className="profile-pic-container">
          <div className="profile-pic">
            <p style={{ fontSize: "50px" }}>
              {userData?.name?.split()[0][0] || "NA"}
            </p>
          </div>
        </div>
        {/* <div>
          {userData?.isSeller ? (
            <button onClick={showUserStores}>My Stores</button>
          ) : (
            <button onClick={makeUserSeller}>Become a Seller!</button>
          )}
        </div> */}
        <div className="all-info">
          <p>Name</p>
          <input
            value={userData?.name || ""}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            type="text"
            placeholder="Name"
          />
          <div>
            <p>Email</p>
            <input
              type="text"
              value={userData?.email || ""}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
          </div>
          <div>
            <p>Phone</p>
            <input
              value={userData?.mobile || ""}
              disabled
              onChange={(e) =>
                setUserData({ ...userData, mobile: e.target.value })
              }
              type="text"
            />
          </div>
          <div>
            <p>Date of Birth</p>
            <input
              value={userData?.dob || ""}
              onChange={(e) =>
                setUserData({ ...userData, dob: e.target.value })
              }
              type="date"
            />
          </div>
          <div className="gender-container">
            <p>Gender</p>
            <select
              value={userData.genderId}
              onChange={(e) =>
                setUserData({ ...userData, genderId: e.target.value })
              }
            >
              {genders.map((g) => (
                <option key={g.genderId} value={g.genderId}>
                  {g.gender}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="footer">
          <button onClick={handleSubmit}>
            {loader ? <Loader /> : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Account;
