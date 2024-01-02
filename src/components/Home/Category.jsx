import { useEffect, useState } from "react";
import "./category.css";
import { Tooltip, colors } from "@mui/material";
import { getAllCategories } from "../../services/categories.services";
import { useNavigate } from "react-router-dom";

function Categories({ showSubcat = () => {}, showStores = () => {} }) {
  const imagePath = "src/category-icons/";
  const [categories, setCategories] = useState([]);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const navigate = useNavigate();
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

  let colors = [
    "#F1AA26",
    "#7B0555",
    "#24A1BC",
    "#C5143E",
    "#F98E3D",
    "#4169E2",
    "#006E5E",
    "#CB6D51",
    "#749255",
    "#51111B",
    "#FAD95B",
    "#C85B8A",
    "#FF5C1E",
    "#CCCAC9",
    "#BBE8B1",
  ];

  const handleClick = async (catId) => {
    window.location.pathname === "/categories"
      ? showSubcat(catId)
      : navigate("/stores", { state: { catId, categories } });
  };
  return (
    <div className={`category-container ${showAllCategories && "expanded"} `}>
      <div className="category-icon-container">
        {categories.map((c, i) => (
          <Tooltip key={i} title={c.categoryName} arrow>
            <div
              className="cat-image-container"
              style={{ backgroundColor: colors[i] }}
              onClick={() => {
                console.log("click");
                handleClick(c.categoryId);
              }}
            >
              <p>{c.categoryName}</p>
              <img className="category-icon" src={imagePath + c.icon} alt="" />
            </div>
          </Tooltip>
        ))}
      </div>
    </div>
  );
}

export default Categories;
