import React from "react";
import { useNavigate } from "react-router-dom";
import "./sidebar.css";
import SidebarTabs from "./SidebarTabs";

function Sidebar({ showMenu }) {
  const tabs = [
    { name: "Home", path: "/home", icon: "house" },
    { name: "Categories", path: "/categories", icon: "shapes" },
    { name: "Chat", path: "/chat", icon: "comment" },
    { name: "Account", path: "/account", icon: "user" },
  ];
  return (
    <div className={`side-bar ${showMenu && "expanded"}`}>
      {(tabs || []).map((tab, i) => (
        <SidebarTabs tab={tab} showMenu={showMenu} key={i} />
      ))}
    </div>
  );
}

export default Sidebar;
