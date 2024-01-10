import { useContext, useState } from "react";
import { getSubcategories } from "../../services/categories.services";
import Categories from "../Home/Category";
import "./categoriesTab.css";
import { Slider } from "@mui/material";
import RangeSlider from "../UIElements/RangeSlider";
import { LoaderContext } from "../../context/LoaderContext";
import SubcategoryCard from "./SubcategoryCard";
import { useNavigate } from "react-router-dom";

function CategoriesTab() {
  const [subcategories, setSubcategories] = useState();

  const [range, setRange] = useState(50);
  const { apiLoader, toggleLoading } = useContext(LoaderContext);
  const navigate = useNavigate();

  const showSubcat = async (catId) => {
    try {
      toggleLoading(true);
      const res = await getSubcategories({
        categoryId: catId,
        subCategoryNames: [],
      });
      setSubcategories(res?.data || []);
    } catch (error) {
      console.log(error.error || error.message || error);
    } finally {
      toggleLoading(false);
    }
  };

  const handleSliderChange = (e) => {
    setRange(e?.target?.value || 50);
  };

  const handleSubcatClick = (e) => {
    navigate("/stores", {
      state: {
        subcategoryId: e?.subcategoryId || "",
        range,
        subcategories,
      },
    });
  };

  return (
    <>
      <Categories showSubcat={showSubcat} />
      <div className="subcategories-container">
        <p>Select Subcategory</p>
        <div className="subcategory-container">
          {(subcategories || []).map((e) => (
            <SubcategoryCard e={e} handleSubcatClick={handleSubcatClick} />
          ))}
        </div>
        <p>Set Search Range</p>
        <div className="range-container">
          <p>{range}</p>
          <RangeSlider width={"40%"} handleSliderChange={handleSliderChange} />
          <p>kms</p>
        </div>
      </div>
    </>
  );
}

export default CategoriesTab;
