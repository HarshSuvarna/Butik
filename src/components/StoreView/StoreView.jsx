import { useLocation, useNavigate } from "react-router-dom";
import Stores from "../Home/Stores";
import "./storeView.css";
import RangeSlider from "../UIElements/RangeSlider";
import { useContext, useEffect, useState } from "react";
import { LoaderContext } from "../../context/LoaderContext";
// import { useHistory } from "react-router-dom";

function StoreView() {
  const [category, setCategory] = useState({});
  const [subcategory, setSubcategory] = useState({});
  const location = useLocation();

  let navigate = useNavigate();

  let { catId, subcategoryId, range, subcategories, categories, color } =
    location.state || {};
  useEffect(() => {
    setCategory({ ...(categories || []).find((c) => c.categoryId === catId) });
    setSubcategory({
      ...(subcategories || []).find((sc) => sc.subcategoryId === subcategoryId),
    });
  }, []);
  return (
    <div className="stores-container">
      <div className="filter-container">
        <i className="fa-solid fa-arrow-left" onClick={() => navigate(-1)} />
        <p className="store-text">
          &nbsp;Showing all stores with&nbsp;
          <span style={{ margin: "0px", color: color || "red" }}>
            {category?.categoryName || subcategory?.subcategoryName}
          </span>
        </p>
      </div>
      <Stores categoryId={catId} subcategoryId={subcategoryId} range={range} />
    </div>
  );
}

export default StoreView;
