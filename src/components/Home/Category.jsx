import { useEffect, useState } from "react";
import "./category.css";
import { Tooltip } from "@mui/material";
import { getAllCategories } from "../../services/categories.services";

function Categories({ showSubcat }) {
  const imagePath = "src/category-icons/";
  const [categories, setCategories] = useState([]);
  const [showAllCategories, setShowAllCategories] = useState(false);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await getAllCategories({
        categoryNames: [],
      });

      setCategories(res?.data || []);
    } catch (error) {}
  };

  const handleClick = async (catId) => {
    showSubcat(catId);
  };
  return (
    <div className={`category-container ${showAllCategories && "expanded"} `}>
      <div className="category-icon-container">
        {categories.map((c, i) => (
          <Tooltip key={i} title={c.categoryName} arrow>
            <img
              onClick={() => {
                handleClick(c.categoryId);
              }}
              className="category-icon"
              src={imagePath + c.icon}
              alt=""
            />
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
