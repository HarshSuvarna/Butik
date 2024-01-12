import { useNavigate } from "react-router-dom";
import Categories from "../Home/Category";
import Stores from "../Home/Stores";
import { useRef } from "react";

function HomeTab() {
  const bodyRef = useRef();
  function scrollToTarget() {
    bodyRef.current.scrollIntoView({ behavior: "smooth" });
  }
  return (
    <>
      <div className={`hero-space-container`}>
        <img className="hero-img" src={"images/landing.png"} alt="" />
        <div className={`text`}>
          <p className="title">Find Stores</p>
          <p className="description">
            Uncover hidden gems in your neighborhood with Butik. Explore nearby
            stores offering a diverse range of products. Your next great find is
            just a click away!
          </p>
          <button onClick={scrollToTarget}>Get Started</button>
        </div>
      </div>
      {/* <div ref={bodyRef}> */}
        <Categories/>
        <div className="store-div" ref={bodyRef}>
          <Stores />
        </div>
      {/* </div> */}
    </>
  );
}

export default HomeTab;
