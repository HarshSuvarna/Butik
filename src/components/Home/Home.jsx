// components/Home/Home.js
import React, { useEffect, useState } from "react";
import { getUser } from "../../services/auth.services";
import "./home.css";
import { getNearestStores, getLocation } from "../../services/stores.services";
import { getAllCategories } from "../../services/categories.services";
import { Navigate, Route, Routes } from "react-router-dom";
import Categories from "./Category";
import Stores from "./Stores";
import Loader from "../loader/loader";

const Home = ({ cookies }) => {
  const [categories, setCategories] = useState([]);
  const [stores, setStores] = useState([]);
  const [showMenu, setShowMenu] = useState(false);

  const path = window.location.pathname;

  useEffect(() => {
    fetchData();
  }, []);

  const renderContent = () => {
    // switch (path) {
    //   case "/home":
    //     return (
    //       <>
    //         <Categories categories={categories} />
    //         <Stores stores={stores} />
    //       </>
    //     );
    //   //   return <HomeContent />;
    //   // case "category":
    //   //   return <CategoryContent />;
    //   // case "chat":
    //   //   return <ChatContent />;
    //   // case "account":
    //   //   return <AccountContent />;
    //   default:
    //     window.history.pushState({}, "", "/home");
    // }
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

  useEffect(() => {
    console.log("path :>> ", path);
  }, [path]);

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

  const logout = () => {
    cookies.remove("jwt_authorization");
  };

  return (
    <>
      <div className="nav-bar">
        <i
          className="fa-solid fa-list"
          onClick={() => setShowMenu(!showMenu)}
        />
        <div className="right-container">
          <input className="search" type="text" />
          <button onClick={logout}>Logout</button>
        </div>
      </div>
      <div className="body-content">
        <div className={`side-bar ${showMenu && "expanded"}`}>
          <i
            className="fa-solid fa-house icon-container"
            onClick={() => {
              window.history.pushState({}, "", "/home");
            }}
          >
            <p>Home</p>
          </i>
          <i
            className="fa-solid fa-shapes"
            onClick={() => {
              window.history.pushState({}, "", "/categories");
            }}
          >
            Categories
          </i>
          <i
            className="fa-solid fa-comment"
            onClick={() => {
              window.history.pushState({}, "", "/chat");
            }}
          >
            Chat
          </i>
          <i
            className="fa-solid fa-user"
            onClick={() => {
              window.history.pushState({}, "", "/account");
            }}
          >
            Account
          </i>
        </div>

        <div className="category-store-container">{renderContent()}</div>
      </div>
    </>
  );
};

export default Home;
