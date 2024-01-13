// App.js
import React, { useState, useEffect } from "react";
import "./app.css";
import Auth from "./components/Auth/Auth";
import Home from "./components/Home/Home";
import { LoaderContext } from "./context/LoaderContext";
import { ToastContainer } from "react-toastify";

function App({ cookies }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [apiLoader, toggleLoading] = useState(false);
  useEffect(() => {
    const token = cookies.get("jwt_authorization");
    if (token) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, [cookies]);

  // Show loading spinner or other loading UI while checking authentication

  return (
    <LoaderContext.Provider value={{ apiLoader, toggleLoading }}>
      <div className="main">
        <ToastContainer position="top-right" />
        {!isAuthenticated && (
          <Auth setIsAuthenticated={setIsAuthenticated} cookies={cookies} />
        )}
        {isAuthenticated && <Home cookies={cookies} />}
      </div>
    </LoaderContext.Provider>
  );
}

export default App;
