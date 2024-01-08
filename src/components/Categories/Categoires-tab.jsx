import { useContext, useEffect, useState } from "react";
import { getSubcategories } from "../../services/categories.services";
import Categories from "../Home/Category";
import "./categoriesTab.css";
import { Slider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import RangeSlider from "../UIElements/RangeSlider";
import { LoaderContext } from "../../context/LoaderContext";

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
  return (
    <>
      <Categories showSubcat={showSubcat} />
      <div className="subcategories-container">
        <RangeSlider width={"40%"} handleSliderChange={handleSliderChange} />
        <div className="subcategory-container">
          {(subcategories || []).map((e) => (
            <div
              className="subcategories"
              key={e.subcategoryId}
              onClick={() =>
                navigate("/stores", {
                  state: {
                    subcategoryId: e?.subcategoryId || "",
                    range,
                    subcategories,
                  },
                })
              }
            >
              {e.subcategoryName}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default CategoriesTab;
