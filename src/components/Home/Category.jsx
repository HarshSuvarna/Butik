import { useContext, useEffect, useRef, useState } from "react";
import "./category.css";
import { getAllCategories } from "../../services/categories.services";
import { useNavigate } from "react-router-dom";
import { LoaderContext } from "../../context/LoaderContext";
import { colors } from "../../constants";
import CategoryCard from "./CategoryCard";

function Categories({ showSubcat = () => {} }) {
  const [categories, setCategories] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const navigate = useNavigate();
  const containerRef = useRef();
  const { apiLoader, toggleLoading } = useContext(LoaderContext);

  useEffect(() => {
    fetchData();
  }, []);

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
            <CategoryCard
              c={c}
              handleClick={handleClick}
              color={colors[i]}
              key={i}
            />
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
