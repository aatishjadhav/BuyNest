import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../slices/cartSlice";
import { removeFromWishlist } from "../slices/wishSlice";

const WishList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { wish } = useSelector((state) => state.wish);
  console.log("Wishlist", wish);

  const handleAdd = (item) => {
    dispatch(addToCart(item));
    navigate("/cart");
  };

  return (
    <div className="container">
      <h3 className="text-center py-3">My Wishlist({wish.length})</h3>
      <div className="row">
        {wish.map((item, index) => (
          <div key={index} className="col-md-3">
            <div className="card text-center">
              <div style={{ backgroundColor: "light", padding: "20px" }}>
                <img
                  src={item.imgUrl}
                  className="img-fluid"
                  alt="Product"
                  style={{
                    height: "200px",
                    width: "80%",
                    objectFit: "contain",
                  }}
                />
              </div>
              <h5 className="card-title mt-2">{item.name}</h5>
              <div className="card-body">
                <p className="card-text">₹{item.price}</p>
                <button
                  className="btn btn-primary w-100"
                  onClick={() => handleAdd(item)}
                >
                  Move To Cart
                        </button>
                        <button
                  className="btn btn-secondary w-100 mt-2"
                  onClick={() => dispatch(removeFromWishlist(item._id))}
                >
                  Remove From Wishlist
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishList;
