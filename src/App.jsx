// App.js
import React, { useState, useEffect } from "react";
import "./App.css";
import Auth from "./components/Auth/Auth";
import Home from "./components/Home/Home";

function App({ cookies }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = cookies.get("jwt_authorization");
    console.log(" isAuthenticated:>> ", isAuthenticated);
    if (token) {
      setIsAuthenticated(true);
    }
  }, [isAuthenticated]);
  return (
    <div className="main">
      {!isAuthenticated && (
        <Auth setIsAuthenticated={setIsAuthenticated} cookies={cookies} />
      )}
      {isAuthenticated && <Home cookies={cookies} />}
    </div>
  );
}

export default App;
