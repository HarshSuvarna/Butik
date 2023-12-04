// components/Home/Home.js
import React from "react";

const Home = ({ cookies }) => {
  return (
    <div className="home-container">
      <h2>Welcome to Home</h2>
      <button onClick={() => cookies.remove("jwt_authorization")}>
        Logout
      </button>
      {/* Add content for the Home component */}
    </div>
  );
};

export default Home;
