// components/Home/Home.js
import React, { useEffect, useState } from "react";
import { getUser } from "../../services/auth.services";
import "./home.css";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Categories from "./Category";
import Stores from "./Stores";
import Account from "../Account/Account";
import { useMyContext } from "../../context/AuthContext";
import Chat from "../Chat/Chat";
import CategoriesTab from "../Categories/Categoires-tab";
import StoreView from "../StoreView/StoreView";
import HomeTab from "../HomeTab/HomeTab";
import { getLocation } from "../../services/stores.services";

const Home = ({ cookies }) => {
  const [showMenu, setShowMenu] = useState(false);
  const { contextValues, updateContextValue } = useMyContext();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const renderContent = () => {
    return (
      <Routes>
        <Route path="/home" exact element={<HomeTab />} />
        <Route path="/categories" exact element={<CategoriesTab />} />
        <Route path="/chat" exact element={<Chat />} />
        <Route path="/account" exact element={<Account />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
        <Route path="/stores" exact element={<StoreView />} />
      </Routes>
    );
  };

  const fetchData = async () => {
    try {
      const responses = await Promise.all([getUser(), getLocation()]);
      let userData = responses[0];
      const location = responses[1];
      userData = {
        ...userData.data,
        latitude: location.latitude,
        longitude: location.longitude,
      };
      updateContextValue("auth", userData || {});
    } catch (e) {
      // Handle errors in the API call
      console.error(e.message || e.error || e);
    }
  };

  const logout = async () => {
    cookies.remove("jwt_authorization");
    const userData = await getUser();
    navigate("/home");
  };

  return (
    <>
      <div className="nav-bar">
        <div className="left-container">
          <i
            className={showMenu ? "fa-solid fa-arrow-left" : "fa-solid fa-list"}
            onClick={() => setShowMenu(!showMenu)}
            style={{ color: "white", marginLeft: "18px", fontSize: "20px" }}
          />
          <img
            src="src/category-icons/logo.png"
            alt=""
            onClick={() => navigate("/home")}
            style={{ cursor: "pointer" }}
          />
        </div>
        <div className="right-container">
          <input className="search" type="text" />
          <button onClick={logout}>Logout</button>
        </div>
      </div>
      <div className="body-content">
        <div className={`side-bar ${showMenu && "expanded"}`}>
          <div
            className="sidebar-tabs"
            onClick={() => {
              navigate("/home");
              setShowMenu(false);
            }}
          >
            <i className="fa-solid fa-house icon-container"></i>
            {showMenu && <p>Home</p>}
          </div>
          <div
            className="sidebar-tabs"
            onClick={() => {
              navigate("/categories");
              setShowMenu(false);
            }}
          >
            <i className="fa-solid fa-shapes"></i>
            {showMenu && <p>Categories</p>}
          </div>
          <div
            className="sidebar-tabs"
            onClick={() => {
              navigate("/chat");
              setShowMenu(false);
            }}
          >
            <i className="fa-solid fa-comment"></i>
            {showMenu && <p>Chat</p>}
          </div>
          <div
            className="sidebar-tabs"
            onClick={() => {
              navigate("/account");
              setShowMenu(false);
            }}
          >
            <i className="fa-solid fa-user"></i>
            {showMenu && <p>Account</p>}
          </div>
        </div>

        <div className="category-store-container">{renderContent()}</div>
      </div>
    </>
  );
};

export default Home;
