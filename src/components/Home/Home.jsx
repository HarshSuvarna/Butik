// components/Home/Home.js
import React, { useContext, useEffect, useRef, useState } from "react";
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
import { LoaderContext } from "../../context/LoaderContext";
import ApiLoader from "../UIElements/ApiLoader";
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
    setPath(window.location.pathname);
  }, []);

  const { apiLoader, toggleLoading } = useContext(LoaderContext);
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
        <Route path="/stores" exact element={<StoreView />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    );
  };

  function scrollToTarget() {
    bodyRef.current.scrollIntoView({ behavior: "smooth" });
  }

  const fetchData = async () => {
    try {
      toggleLoading(true);
      const responses = await Promise.all([getUser(), getLocation()]);
      let userData = responses[0];
      const location = responses[1];
      userData = {
        ...userData.data,
        latitude: location.latitude,
        longitude: location.longitude,
      };
      updateContextValue("auth", userData || {});
      toggleLoading(false);
    } catch (e) {
      console.error(e.message || e.error || e);
    }
  };

  return (
    <>
      <ApiLoader />
      <Navbar setShowMenu={setShowMenu} showMenu={showMenu} cookies={cookies} />
      <Sidebar showMenu={showMenu} />
      <div className="body-content">
        <div
          className={`hero-space-container ${
            path !== "/home" && "hide-hero-container"
          }`}
        >
          <img className="hero-img" src={"images/landing.png"} alt="" />
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
