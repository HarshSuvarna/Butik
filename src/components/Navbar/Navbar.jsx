import React, { useEffect, useRef, useState } from "react";
import { useAsyncError, useNavigate } from "react-router-dom";
import "./navbar.css";
import logo from "../../category-icons/logo.png";

function Navbar({ setShowMenu, showMenu, cookies }) {
  const [navBackground, setNavBackground] = useState(false);
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [path, setPath] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    setPath(window.location.pathname);
  }, [window.location.pathname]);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setNavBackground(true);
      } else setNavBackground(false);
    });
    window.addEventListener("click", (e) => {
      if (
        !e.target.classList.contains("search-container") &&
        !e.target.classList.contains("search") &&
        !e.target.classList.contains("fa-magnifying-glass") &&
        !e.target.classList.contains("fa-solid")
      ) {
        setShowSearchBox(false);
      }
    });
    return () => {
      window.removeEventListener("scroll", null);
      window.removeEventListener("click", null);
    };
  }, []);

  const logout = async () => {
    cookies.remove("jwt_authorization");
    window.location.reload();
  };

  const handleSearchClick = () => {
    setShowSearchBox(true);
  };
  return (
    <div
      className={`nav-bar ${
        (navBackground || path !== "/home") && "nav-background"
      }`}
    >
      <div className="left-container">
        <i
          className={showMenu ? "fa-solid fa-arrow-left" : "fa-solid fa-list"}
          onClick={() => setShowMenu(!showMenu)}
          style={{
            color: " rgb(99, 99, 99)",
            marginLeft: "18px",
            fontSize: "20px",
          }}
        />
        <img
          src={logo}
          alt=""
          onClick={() => navigate("/home")}
          style={{ cursor: "pointer" }}
        />
      </div>
      <div className="right-container">
        <div className={`search-container ${showSearchBox && "click-search"}`}>
          <i
            className="fa-solid fa-magnifying-glass"
            onClick={handleSearchClick}
            style={{ color: showSearchBox ? "white" : "black" }}
          />
          <input className="search" type="text" />
        </div>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}

export default Navbar;
