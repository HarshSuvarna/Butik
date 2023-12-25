import { useEffect, useState } from "react";
import { getSubcategories } from "../../services/categories.services";
import Categories from "../Home/Category";
import "./categoriesTab.css";
import { Slider } from "@mui/material";

function CategoriesTab() {
  const [subcategories, setSubcategories] = useState();
  const showSubcat = async (catId) => {
    try {
      const res = await getSubcategories({
        categoryId: catId,
        subCategoryNames: [],
      });
      setSubcategories(res?.data || []);
    } catch (error) {
      console.log(error.error || error.message || error);
    }
  };
  return (
    <>
      <Categories showSubcat={showSubcat} />
      <div className="subcategories-container">
        <Slider
          defaultValue={50}
          aria-label="Default"
          valueLabelDisplay="auto"
          step={50}
          min={50}
          max={1000}
          style={{ width: "40%" }}
        />
        <div className="subcategory-container">
          {(subcategories || []).map((e) => (
            <>{e.subcategoryName}</>
          ))}
        </div>
      </div>
    </>
  );
}

export default CategoriesTab;
