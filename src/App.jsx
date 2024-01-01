// App.js
import React, { useState, useEffect } from "react";
import "./App.css";
import Auth from "./components/Auth/Auth";
import Home from "./components/Home/Home";
import Loader from "./components/UIElements/loader";

function App({ cookies }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = cookies.get("jwt_authorization");
    if (token) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, [cookies]);

  // Show loading spinner or other loading UI while checking authentication
  if (loading) {
    return (
      <>
        <Loader />
      </>
    );
  }

  return (
    <div style={{ height: "100vh" }} className="main">
      {!isAuthenticated && (
        <Auth setIsAuthenticated={setIsAuthenticated} cookies={cookies} />
      )}
      {isAuthenticated && <Home cookies={cookies} />}
    </div>
  );
}

export default App;
