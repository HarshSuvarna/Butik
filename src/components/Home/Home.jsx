// components/Home/Home.js
import React, { useEffect, useRef, useState } from "react";
import { getUser } from "../../services/auth.services";
import "./home.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Account from "../Account/Account";
import { useMyContext } from "../../context/AuthContext";
import Chat from "../Chat/Chat";
import CategoriesTab from "../Categories/Categoires-tab";
import StoreView from "../StoreView/StoreView";
import HomeTab from "../HomeTab/HomeTab";
import { getLocation } from "../../services/stores.services";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";

const Home = ({ cookies }) => {
  const [showMenu, setShowMenu] = useState(false);
  const { contextValues, updateContextValue } = useMyContext();
  const [path, setPath] = useState();
  const bodyRef = useRef();
  useEffect(() => {
    fetchData();
    window.addEventListener("click", (e) => {
      if (
        !e.target.classList.contains("fa-solid") &&
        !e.target.classList.contains("fa-arrow-left")
      ) {
        setShowMenu(false);
      }
    });
  }, []);

  useEffect(() => {
    setPath(window.location.pathname);
  }, [window.location.pathname]);

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

  function scrollToTarget() {
    bodyRef.current.scrollIntoView({ behavior: "smooth" });
  }

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
      console.error(e.message || e.error || e);
    }
  };

  return (
    <>
      <Navbar setShowMenu={setShowMenu} showMenu={showMenu} cookies={cookies} />
      <Sidebar showMenu={showMenu} />
      <div className="body-content">
        <div
          className={`hero-space-container ${
            path !== "/home" && "hide-hero-container"
          }`}
        >
          <img
            className="hero-img"
            src="src/category-icons/landing.png"
            alt=""
          />
          <div className={`text ${path !== "/home" && "hide-text"}`}>
            <p className="title">Find Stores</p>
            <p className="description">
              Uncover hidden gems in your neighborhood with Butik. Explore
              nearby stores offering a diverse range of products. Your next
              great find is just a click away!
            </p>
            <button onClick={scrollToTarget}>Get Started</button>
          </div>
        </div>
        <div className="category-store-container" ref={bodyRef}>
          {renderContent()}
        </div>
      </div>
    </>
  );
};

export default Home;
