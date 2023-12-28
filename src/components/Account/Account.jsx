import { useEffect, useState } from "react";
import { useMyContext } from "../../context/AuthContext";
import "./account.css";
import { getAllGenders } from "../../services/attributes.services";
import { makeSeller, updateUser } from "../../services/user.services";
import Loader from "../UIElements/loader";

function Account() {
  const { contextValues, updateContextValue } = useMyContext();
  const [userData, setUserData] = useState({ ...contextValues.auth });
  const [genders, setGenders] = useState([]);
  const [loader, setLoading] = useState(false);
  useEffect(() => {
    fetchData();
    setUserData({ ...contextValues.auth });
  }, []);
  const fetchData = async () => {
    const res = await getAllGenders({
      genderNames: [],
    });
    setGenders([...res?.data]);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      let res = await updateUser({ ...userData });
      updateContextValue("auth", res?.data || userData);
      setLoading(false);
    } catch (e) {
      console.log(e?.message || e?.error || e);
    }
  };

  const makeUserSeller = async () => {
    try {
      const res = await makeSeller({ uid: userData.uid });
      setUserData({ ...userData, isSeller: true });
    } catch (e) {
      console.log(e?.message || e?.error || e);
    }
  };

  const showUserStores = async () => {
    try {
      console.log("Show user stores");
    } catch (e) {
      console.log(e?.message || e?.error || e);
    }
  };

  return (
    <div className="account-container">
      <div className="seller-section">
        <div className="profile-pic">
          <p style={{ fontSize: "50px" }}>
            {userData?.name?.split()[0][0] || "NA"}
          </p>
        </div>
        <input
          className="username"
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
      <div className="user-info">
        <div>Profile</div>

        <div>
          Email
          <input
            type="text"
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
            type="text"
          />
        </div>
        <div>
          Date of Birth
          <input
            value={userData?.dob || ""}
            onChange={(e) => setUserData({ ...userData, dob: e.target.value })}
            type="date"
            name=""
            id=""
          />
        </div>
        <div>
          Gender
          <select
            value={userData.genderId}
            onChange={(e) =>
              setUserData({ ...userData, genderId: e.target.value })
            }
            id=""
          >
            {genders.map((g) => (
              <option key={g.genderId} value={g.genderId}>
                {g.gender}
              </option>
            ))}
          </select>
        </div>
        <button onClick={handleSubmit}>{loader ? <Loader /> : "Submit"}</button>
      </div>
    </div>
  );
}

export default Account;
