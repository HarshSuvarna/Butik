import React from "react";

function SubcategoryCard({ e, handleSubcatClick, }) {
  return (
    <div
      className="subcategories"
      key={e.subcategoryId}
      onClick={() => handleSubcatClick(e)}
    >
      {e.subcategoryName}
    </div>
  );
}

export default SubcategoryCard;
