import React from "react";
import "./sidebar.css";
import { useNavigate } from "react-router-dom";

function SidebarTabs({ tab, showMenu }) {
  const navigate = useNavigate();
  const { name, path, icon } = tab;
  return (
    <div
      className="sidebar-tabs"
      onClick={() => {
        navigate(path);
      }}
    >
      {showMenu && (
        <p className="tab-title">
          <i className={`fa-solid fa-${icon}`} />
          &nbsp; {name}
        </p>
      )}
    </div>
  );
}

export default SidebarTabs;
