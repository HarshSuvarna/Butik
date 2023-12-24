function Navbar({ handleShowMenu, cookies }) {
  const logout = () => {
    cookies.remove("jwt_authorization");
  };
  return (
    <div className="nav-bar">
      <i
        className={
          handleShowMenu ? "fa-solid fa-arrow-left" : "fa-solid fa-list"
        }
        onClick={handleShowMenu}
        style={{ color: "white", marginLeft: "18px", fontSize: "20px" }}
      />
      <div className="right-container">
        <input className="search" type="text" />
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}

export default Navbar;
