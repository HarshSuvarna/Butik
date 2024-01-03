import { useEffect, useRef, useState } from "react";
import "./category.css";
import { getAllCategories } from "../../services/categories.services";
import { useNavigate } from "react-router-dom";

function Categories({ showSubcat = () => {}, showStores = () => {} }) {
  const imagePath = "src/category-icons/";
  const [categories, setCategories] = useState([]);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const navigate = useNavigate();
  const containerRef = useRef();
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

  const handleHorizontalScroll = (scrollDistance) => {
    const newScrollPosition = scrollPosition + scrollDistance;
    setScrollPosition(newScrollPosition);
    containerRef.current.scrollLeft += scrollDistance;
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
    <div className="category-parent">
      <p className="category-title">Shop Our Top Categories</p>
      <div ref={containerRef} className="category-container">
        <div className="category-icon-container">
          {categories.map((c, i) => (
            // <>asdfadsf</>
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
          ))}
        </div>
      </div>
      <button
        className="category-container-left"
        onClick={() => handleHorizontalScroll(-1100)}
      >
        <i class="fa-solid fa-angle-left" />
      </button>
      <button
        className="category-container-right"
        onClick={() => handleHorizontalScroll(1100)}
      >
        <i class="fa-solid fa-angle-right" />
      </button>
    </div>
  );
}

export default Categories;
