import { useLocation, useNavigate } from "react-router-dom";
import Stores from "../Home/Stores";
import "./storeView.css";
import RangeSlider from "../loader/RangeSlider";
import { useEffect, useState } from "react";
// import { useHistory } from "react-router-dom";

function StoreView() {
  const [category, setCategory] = useState({});
  const [subcategory, setSubcategory] = useState({});
  const location = useLocation();
  let navigate = useNavigate();

  let { catId, subcategoryId, range, subcategories, categories } =
    location.state || {};
  // let history = useHistory();
  useEffect(() => {
    setCategory({ ...(categories || []).find((c) => c.categoryId === catId) });
    setSubcategory({
      ...(subcategories || []).find((sc) => sc.subcategoryId === subcategoryId),
    });
    // const handleSliderChange = (e) => {
    //   range = e.target.value;
    // };
  }, []);
  return (
    <div className="stores-container">
      <div className="filter-container">
        {/* <RangeSlider width={"40%"} handleSliderChange={handleSliderChange} /> */}
        <i className="fa-solid fa-arrow-left" onClick={() => navigate(-1)} />
        <div>
          <p>
            Showing all stores with{" "}
            {category?.categoryName || subcategory?.subcategoryName}{" "}
          </p>
          <p style={{ visibility: !range && "hidden" }}>
            Range:
            {range} kms
          </p>
        </div>
      </div>
      <Stores categoryId={catId} subcategoryId={subcategoryId} range={range} />
    </div>
  );
}

export default StoreView;
