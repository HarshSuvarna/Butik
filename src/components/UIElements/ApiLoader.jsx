import React, { useContext } from "react";
import "./loader.css";
import { Loader } from "./loader";
import { LoaderContext } from "../../context/LoaderContext";
function ApiLoader() {
  const { apiLoader, toggleLoading } = useContext(LoaderContext);
  return (
    <div
      style={{ visibility: !apiLoader && "hidden" }}
      className="api-loader-container"
    >
      <Loader />
    </div>
  );
}

export default ApiLoader;
