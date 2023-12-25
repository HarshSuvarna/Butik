// components/Home/Home.js
import React, { useEffect, useState } from "react";
import { getUser } from "../../services/auth.services";
import "./home.css";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Categories from "./Category";
import Stores from "./Stores";
import Loader from "../loader/loader";
import Account from "../Account/Account";
import { useMyContext } from "../../context/AuthContext";
import Chat from "../Chat/Chat";
import CategoriesTab from "../Categories/Categoires-tab";

const Home = ({ cookies }) => {
  const [showMenu, setShowMenu] = useState(false);
  const { updateContextValue } = useMyContext();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const renderContent = () => {
    return (
      <Routes>
        <Route
          path="/home"
          exact
          element={
            <>
              <Categories />
              <div className="store-div">
                <Stores />
              </div>
            </>
          }
        />
        <Route path="/categories" exact element={<CategoriesTab />} />
        <Route path="/chat" exact element={<Chat />} />
        <Route path="/account" exact element={<Account />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    );
  };

  const fetchData = async () => {
    try {
      const userData = await getUser();
      updateContextValue("auth", userData?.data || {});
    } catch (e) {
      // Handle errors in the API call
      console.error(e.message || e.error || e);
    }
  };

  const logout = () => {
    cookies.remove("jwt_authorization");
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
