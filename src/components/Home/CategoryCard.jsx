import React from "react";
import "./categoryCard.css";
function CategoryCard({
  c,
  handleClick,
  color,
  selectedCategory,
  setSelectedCategory,
}) {
  const imagePath = "images/";
  return (
    <div
      className={`cat-image-container ${
        selectedCategory === c.categoryId ? `selected` : ""
      }`}
      style={{
        backgroundColor: color,
      }}
      onClick={() => {
        handleClick(c.categoryId, color);
        setSelectedCategory(c.categoryId);
      }}
    >
      <p>{c.categoryName}</p>
      <img
        className={`category-icon ${
          selectedCategory === c.categoryId ? `selected` : ""
        }`}
        src={imagePath + c?.icon}
        alt=""
      />
    </div>
  );
}

export default CategoryCard;
