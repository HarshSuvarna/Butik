import React from "react";
import { useNavigate } from "react-router-dom";
import "./sidebar.css";
import SidebarTabs from "./SidebarTabs";

function Sidebar({ showMenu }) {
  const tabs = [
    { name: "Home", path: "Butik/home", icon: "house" },
    { name: "Categories", path: "Butik/categories", icon: "shapes" },
    { name: "Chat", path: "Butik/chat", icon: "comment" },
    { name: "Account", path: "Butik/account", icon: "user" },
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
