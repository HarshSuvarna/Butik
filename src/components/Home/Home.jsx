// components/Home/Home.js
import React, { useEffect, useState } from "react";
import { getUser } from "../../services/auth.services";
import "./home.css";
import { getNearestStores, getLocation } from "../../services/stores.services";
import { getAllCategories } from "../../services/categories.services";
import Categories from "./Category";
import Stores from "./Stores";

const Home = ({ cookies }) => {
  const [categories, setCategories] = useState([]);
  const [stores, setStores] = useState([]);

  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

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

      <div className={`side-bar ${showMenu && "expanded"}`}>
        <i className="fa-solid fa-house icon-container">
          <p>Home</p>
        </i>
        <i className="fa-solid fa-shapes">Categories</i>
        <i className="fa-solid fa-comment">Chat</i>
        <i className="fa-solid fa-user">Account</i>
      </div>

      <div className="category-store-container">
        <Categories categories={categories} />
        <Stores stores={stores} />
      </div>
    </>
  );
};

export default Home;
