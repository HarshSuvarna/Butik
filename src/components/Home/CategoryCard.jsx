import React from "react";

function CategoryCard({ c, handleClick, color }) {
  const imagePath = "images/";

  return (
    <div
      className="cat-image-container"
      style={{ backgroundColor: color }}
      onClick={() => {
        handleClick(c.categoryId, color);
      }}
    >
      <p>{c.categoryName}</p>
      <img className="category-icon" src={imagePath + c?.icon} alt="" />
    </div>
  );
}

export default CategoryCard;
