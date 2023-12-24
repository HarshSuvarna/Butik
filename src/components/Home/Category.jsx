import { useState } from "react";
import "./category.css";
import { Tooltip } from "@mui/material";

function Categories(props) {
  const imagePath = "src/category-icons/";
  const [showAllCategories, setShowAllCategories] = useState(false);
  return (
    <div className={`category-container ${showAllCategories && "expanded"} `}>
      <div className="category-icon-container">
        {props.categories.map((c, i) => (
          <Tooltip key={i} title={c.categoryName} arrow>
            <img className="category-icon" src={imagePath + c.icon} alt="" />
          </Tooltip>
        ))}
      </div>

      <button onClick={() => setShowAllCategories(!showAllCategories)}>
        {showAllCategories ? <i className="fa-solid fa-xmark"></i> : "View all"}
      </button>
    </div>
  );
}

export default Categories;
