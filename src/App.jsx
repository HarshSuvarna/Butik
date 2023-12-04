// App.js
import React, { useState } from "react";
import "./App.css";
import Auth from "./components/Auth/Auth";
import Home from "./components/Home/Home";
import Cookies from "universal-cookie";

function App() {
  const cookies = new Cookies();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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
