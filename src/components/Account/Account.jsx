import { useContext, useEffect, useState } from "react";
import { useMyContext } from "../../context/AuthContext";
import "./Account.css";
import { getAllGenders } from "../../services/attributes.services";
import { makeSeller, updateUser } from "../../services/user.services";
import { Loader } from "../UIElements/loader";
import { LoaderContext } from "../../context/LoaderContext";

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
    } catch (e) {
      console.log(e?.message || e?.error || e);
    } finally {
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
      <div>Profile</div>
      <div className="user-info">
        <div className="profile-pic-container">
          <div className="profile-pic">
            <p style={{ fontSize: "50px" }}>
              {userData?.name?.split()[0][0] || "NA"}
            </p>
          </div>
        </div>
        <div className="name-seller-container">
          <input
            className="profile-text-inputs"
            value={userData?.name || ""}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            type="text"
          />
          {userData?.isSeller ? (
            <button onClick={showUserStores}>My Stores</button>
          ) : (
            <button onClick={makeUserSeller}>Become a Seller!</button>
          )}
        </div>
        <div className="meta-data-container">
          <div>
            Email
            <input
              type="text"
              className="email-input"
              value={userData?.email || ""}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
          </div>
          <div>
            Phone
            <input
              value={userData?.mobile || ""}
              disabled
              onChange={(e) =>
                setUserData({ ...userData, mobile: e.target.value })
              }
              className="phone-input"
              type="text"
            />
          </div>

          <div>
            Date of Birth
            <input
              value={userData?.dob || ""}
              onChange={(e) =>
                setUserData({ ...userData, dob: e.target.value })
              }
              className="dob-input"
              type="date"
            />
          </div>
          <div>
            Gender
            <select
              value={userData.genderId}
              onChange={(e) =>
                setUserData({ ...userData, genderId: e.target.value })
              }
              className="gender-input"
            >
              {genders.map((g) => (
                <option key={g.genderId} value={g.genderId}>
                  {g.gender}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="button-container">
          <button className="submit-button" onClick={handleSubmit}>
            {loader ? <Loader /> : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Account;
