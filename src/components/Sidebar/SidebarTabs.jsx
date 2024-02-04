import React from "react";
import "./sidebar.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function SidebarTabs({ tab, showMenu }) {
  const navigate = useNavigate();
  const { name, path, icon } = tab;

  const item = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
    },
  };
  return (
    <motion.div
      className="sidebar-tabs"
      onClick={() => {
        navigate(path);
      }}
      variants={item}
      animate={showMenu ? "visible" : "hidden"}
      transition={{ delay: 0.2 }}
    >
      {showMenu && (
        <p className="tab-title">
          <i className={`fa-solid fa-${icon}`} />
          &nbsp; {name}
        </p>
      )}
    </motion.div>
  );
}

export default SidebarTabs;
