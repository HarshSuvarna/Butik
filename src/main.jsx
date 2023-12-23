import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import axios from "axios";
import axiosInterceptors from "./common/axiosInterceptors.js";
import Cookies from "universal-cookie";
import "@fortawesome/fontawesome-free/css/all.css";
import { MyProvider } from "./context/AuthContext.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const cookies = new Cookies();
axiosInterceptors(axios, cookies);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <MyProvider>
    <BrowserRouter>
      <App cookies={cookies} />
    </BrowserRouter>
  </MyProvider>
  // </React.StrictMode>
);
