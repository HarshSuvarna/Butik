// App.js
import React, { useState } from "react";
import "./App.css";
import Auth from "./components/Auth/Auth";
import Home from "./components/Home/Home";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <div className="main">
      {!isAuthenticated && <Auth setIsAuthenticated={setIsAuthenticated} />}
      {isAuthenticated && <Home />}
    </div>
  );
}

export default App;
