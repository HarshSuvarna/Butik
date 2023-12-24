// components/Home/Home.js
import React, { useEffect, useState } from "react";
import { getUser } from "../../services/auth.services";
import "./home.css";
import { getNearestStores, getLocation } from "../../services/stores.services";
import { getAllCategories } from "../../services/categories.services";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Categories from "./Category";
import Stores from "./Stores";
import Loader from "../loader/loader";
import Navbar from "./navbar";

const Home = ({ cookies }) => {
  const [categories, setCategories] = useState([]);
  const [stores, setStores] = useState([]);
  const [showMenu, setShowMenu] = useState(false);

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
              <Categories categories={categories} />
              <Stores stores={stores} />
            </>
          }
        />
        <Route path="/categories" exact element={<Loader />} />
        <Route
          path="/chat"
          exact
          element={
            <>
              <Categories categories={categories} />
              <Stores stores={stores} />
            </>
          }
        />
        <Route
          path="/account"
          exact
          element={
            <>
              <Categories categories={categories} />
              <Stores stores={stores} />
            </>
          }
        />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    );
  };

  const handleShowMenuClick = () => {
    setShowMenu(!showMenu);
    return showMenu;
  };

  const fetchData = async () => {
    try {
      const responses = await Promise.all([
        getUser(),
        getLocation(),
        getAllCategories({
          categoryNames: [],
        }),
      ]);
      const userData = responses[0];
      const location = responses[1];
      setCategories(responses[2]?.data || []);
      const stores = await getNearestStores({
        latitude: location.latitude,
        longitude: location.longitude,
        max_kms: 10000,
      });
      setStores(stores.data);
    } catch (e) {
      // Handle errors in the API call
      console.error(e.message || e.error || e);
    }
  };

  return (
    <>
      <Navbar handleShowMenu={handleShowMenuClick} cookies={cookies} />
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
