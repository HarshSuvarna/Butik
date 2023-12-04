import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import axios from "axios";
import axiosInterceptors from "./common/axiosInterceptors.js";
import Cookies from "universal-cookie";

const cookies = new Cookies();
axiosInterceptors(axios, cookies);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App cookies={cookies} />
  </React.StrictMode>
);
