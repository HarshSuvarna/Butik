import { useNavigate } from "react-router-dom";
import Categories from "../Home/Category";
import Stores from "../Home/Stores";

function HomeTab() {
  return (
    <>
      <Categories />
      <div className="store-div">
        <Stores />
      </div>
    </>
  );
}

export default HomeTab;
