// components/Home/Home.js
import React, { useState } from "react";
import { getUser } from "../../services/auth.services";
import "./home.css";

const Home = ({ cookies }) => {
  const [showMenu, setShowMenu] = useState(false);
  const getSomething = async () => {
    try {
      const res = await getUser();
      console.log("res of getuser API :>> ", res);
    } catch (e) {
      console.log(e.message || e.error || e);
    }
  };

  const logout = () => {
    cookies.remove("jwt_authorization");
  };

  return (
    <>
      <div className="nav-bar">
        <i class="fa-solid fa-list" onClick={() => setShowMenu(!showMenu)} />
        <div className="right-container">
          <button onClick={logout}>Logout</button>
          {/* <button onClick={getSomething}>Get something</button> */}
        </div>
      </div>
      <div className={`side-bar ${showMenu && "expanded"}`}>
        <i class="fa-solid fa-house icon-container">
          <p>Home</p>
        </i>
        <i class="fa-solid fa-shapes">Categories</i>
        <i class="fa-solid fa-comment">Chat</i>
        <i class="fa-solid fa-user">Account</i>
      </div>

      <div className="category-store-container">
        <div className="category-container">category contrainer</div>
        <div className="store-container">store container</div>
      </div>
    </>
  );
};

export default Home;
