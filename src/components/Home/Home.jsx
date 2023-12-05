// components/Home/Home.js
import axios from "axios";
import React from "react";
import { getUser } from "../../services/auth.services";

const Home = ({ cookies }) => {
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
    <div className="home-container">
      <h2>Welcome to Home</h2>
      <button onClick={logout}>Logout</button>

      <button onClick={getSomething}>Get something</button>
      {/* Add content for the Home component */}
    </div>
  );
};

export default Home;
