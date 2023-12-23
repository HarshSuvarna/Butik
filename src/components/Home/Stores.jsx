import "./stores.css";

function Stores(props) {
  return (
    <div className="store-container">
      {props.stores.map((s, i) => (
        <div className="name-img-container">
          <img key={i} src={s.storeImageURL} alt="" />
          <p>{s.name}</p>
        </div>
      ))}
    </div>
  );
}

export default Stores;
