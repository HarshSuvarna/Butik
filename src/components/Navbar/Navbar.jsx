import React, { useEffect, useState } from "react";
import { useAsyncError, useNavigate } from "react-router-dom";
import "./navbar.css";
import { debounce } from "@mui/material";
import { getSearchProducts } from "../../services/product.services";
import { useMyContext } from "../../context/AuthContext";
import Modal from "../UIElements/Modal";

function Navbar({ setShowMenu, showMenu, cookies }) {
  const [navBackground, setNavBackground] = useState(false);
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [path, setPath] = useState();
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [loading, setLoading] = useState();
  const navigate = useNavigate();
  const { contextValues, updateContextValue } = useMyContext();
  const [searchResult, setSearchResult] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [productId, setProductId] = useState("");

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
        !e.target.classList.contains("result") &&
        !e.target.classList.contains("product") &&
        !e.target.classList.contains("image-name-container")
        // !e.target.classList.contains("fa-solid") &&
        // !e.target.classList.contains("fa-solid") &&
      ) {
        setShowSearchBox(false);
        setShowSearchResults(false);
      }
    });
    return () => {
      window.removeEventListener("scroll", null);
      window.removeEventListener("click", null);
    };
  }, []);

  const handleSearchProductClick = (productId) => {
    setProductId(productId);
    setOpenModal(true);
  };

  const handleSearch = async (e) => {
    let searchResult = [];
    setShowSearchResults(false);
    let searchedProduct = e.target.value;
    if (searchedProduct === "") {
      showSearchResults(false);
    }
    if (searchedProduct.length > 2) {
      setLoading(true);

      try {
        searchResult = await getSearchProducts({
          searchedProduct,
          latitude: contextValues?.auth?.latitude,
          longitude: contextValues?.auth?.longitude,
        });
        setSearchResult(searchResult);

        if (searchResult.length) {
          // hoveredCatalog = searchResult[0];
        }
      } catch (err) {
        console.log(err);
      } finally {
        setShowSearchResults(true);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

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
        <div className="sandwich-div">
          <i
            className={showMenu ? "fa-solid fa-arrow-left" : "fa-solid fa-list"}
            onClick={() => setShowMenu(!showMenu)}
            style={{
              color: " rgb(99, 99, 99)",
              marginLeft: "18px",
              fontSize: "20px",
            }}
          />
        </div>
        <img
          src="images/logo.png"
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
            style={{
              color: showSearchBox ? "white" : "black",
              cursor: "pointer",
            }}
          />
          <input
            className="search"
            type="text"
            onChange={debounce(handleSearch, 1000)}
            placeholder="Search Products"
          />
          {showSearchResults && (
            <div className="search-result">
              {searchResult.length ? (
                searchResult.map((sr) => (
                  <div
                    className="product"
                    onClick={() => handleSearchProductClick(sr?.productId)}
                  >
                    <div className="image-name-container">
                      <div className="search-image-container">
                        <img src={sr.imageUrl} alt="" />
                      </div>
                      <p>{sr.productName}</p>
                    </div>
                    <p style={{ fontSize: "11px" }}>
                      {sr.distance.toFixed(1)}&nbsp;kms
                    </p>
                  </div>
                ))
              ) : (
                <p style={{ textAlign: "center" }}>No Products found</p>
              )}
              {}
            </div>
          )}
        </div>
        <button onClick={logout}>Logout</button>
      </div>
      {openModal && <Modal closeModal={setOpenModal} productId={productId} />}
    </div>
  );
}

export default Navbar;
