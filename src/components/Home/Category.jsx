import { useContext, useEffect, useRef, useState } from "react";
import "./category.css";
import { getAllCategories } from "../../services/categories.services";
import { useNavigate } from "react-router-dom";
import { LoaderContext } from "../../context/LoaderContext";
import { colors } from "../../constants";
import Infants from "../../category-icons/Infants.png";
import Bottom_Wear from "../../category-icons/Bottom_Wear.png";
import Boys_Footwear from "../../category-icons/Boys_Footwear.png";
import Fashion_Accessories from "../../category-icons/Fashion_Accessories.png";
import Indian_Festive_Wear from "../../category-icons/Indian_Festive_Wear.png";
import Inner_Sleep_Wear from "../../category-icons/Inner_Sleep_Wear.png";
import Kids_Accessories from "../../category-icons/kids_Accesories.png";
import Kids_Clothing from "../../category-icons/kids_Clothing.png";
import Lingerie_Sleepwear from "../../category-icons/Lingerie_Sleepwear.png";
import Spots_Active_Wear from "../../category-icons/Spots_Active_Wear.png";
import Top_wear from "../../category-icons/Top_wear.png";
import Western_Wear from "../../category-icons/Western_Wear.png";
import Footwear from "../../category-icons/Footwear.png";
import kidsFootwear from "../../category-icons/kids_Footwear.png";

function Categories({ showSubcat = () => {}, showStores = () => {} }) {
  const imagePath = "src/category-icons/";
  const [categories, setCategories] = useState([]);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const navigate = useNavigate();
  const containerRef = useRef();
  const { apiLoader, toggleLoading } = useContext(LoaderContext);

  useEffect(() => {
    fetchData();
  }, []);

  const getImageUrl = async (categories) => {};

  const fetchData = async () => {
    try {
      toggleLoading(true);
      const res = await getAllCategories({
        categoryNames: [],
      });
      setCategories(res?.data);
    } catch (error) {
    } finally {
      toggleLoading(false);
    }
  };

  const handleHorizontalScroll = (scrollDistance) => {
    const newScrollPosition = scrollPosition + scrollDistance;
    setScrollPosition(newScrollPosition);
    containerRef.current.scrollLeft += scrollDistance;
  };

  const handleClick = async (catId, color) => {
    window.location.pathname === "/categories"
      ? showSubcat(catId)
      : navigate("/stores", { state: { catId, categories, color } });
  };
  return (
    <div className="category-parent">
      <p className="category-title">Shop Our Top Categories</p>
      <div ref={containerRef} className="category-container">
        <div className="category-icon-container">
          {(categories || []).map((c, i) => (
            <div
              className="cat-image-container"
              style={{ backgroundColor: colors[i] }}
              onClick={() => {
                handleClick(c.categoryId, colors[i]);
              }}
              key={i}
            >
              <p>{c.categoryName}</p>
              <img className="category-icon" src={Footwear} alt="" />
            </div>
          ))}
        </div>
      </div>
      <button
        className="category-container-left"
        onClick={() => handleHorizontalScroll(-1100)}
      >
        <i className="fa-solid fa-angle-left" />
      </button>
      <button
        className="category-container-right"
        onClick={() => handleHorizontalScroll(1100)}
      >
        <i className="fa-solid fa-angle-right" />
      </button>
    </div>
  );
}

export default Categories;
