import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../slices/cartSlice";
import { removeFromWishlist } from "../slices/wishSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

const WishList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { wish } = useSelector((state) => state.wish);

  const handleAdd = (item) => {
    dispatch(addToCart(item));
    toast.success("Product moved to cart.");
  };

  const handleRemove = (itemId) => {
    dispatch(removeFromWishlist(itemId));
    toast.warning("Product removed from wishlist.");
  };

  const renderStars = (rating) => {
    const ratingValue = parseFloat(rating);
    const stars = [];

    // Create 5 stars (filled, half-filled, or empty)
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(ratingValue)) {
        // Full star
        stars.push(<FaStar key={i} className="text-warning" />);
      } else if (i - 0.5 <= ratingValue) {
        // Half star
        stars.push(<FaStarHalfAlt key={i} className="text-warning" />);
      } else {
        // Empty star
        stars.push(<FaRegStar key={i} className="text-warning" />);
      }
    }

    return stars;
  };

  return (
    <div className="container">
      {wish.length > 0 ? (
        <>
          <h3 className="text-center py-3">My Wishlist({wish.length})</h3>

          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-md-7">
              {wish.map((item, index) => (
                <div className="card shadow-sm p-3 mb-4" key={index}>
                  <div className="row g-0 align-items-center">
                    <div className="col-md-3 text-center">
                      <img
                        src={item.imgUrl}
                        className="img-fluid rounded"
                        alt={item.name}
                        style={{ height: "180px", objectFit: "cover" }}
                      />
                    </div>
                    <div className="col-md-9 ps-4">
                      <Link className="nav-link" to={`/products/${item?._id}`}>
                        <h5 className="fw-bold mb-1">{item.name}</h5>
                        <span>{item.description}</span>
                        <div className="d-flex align-items-center gap-2 mb-2">
                          <span className="fw-bold text-dark py-2">
                            ₹{item.price}
                          </span>
                          <span className="text-muted text-decoration-line-through">
                            ₹{item.originalPrice}
                          </span>
                        </div>
                      </Link>
                      <div className="d-flex gap-3">
                        <button
                          className="btn w-50 fw-bold border border-dark text-dark"
                          style={{ backgroundColor: "transparent" }}
                          onClick={() => handleAdd(item)}
                        >
                          Add To Cart
                        </button>
                        <button
                          className="btn w-50 fw-bold text-light"
                          style={{ backgroundColor: "#121932" }}
                          onClick={() => handleRemove(item._id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-5">
          <p className="display-5">
            <strong>Wishlist is Empty</strong>
          </p>
          <Link
            to="/products"
            className="btn text-light my-3"
            style={{ backgroundColor: "#121932" }}
          >
            Explore Products
          </Link>
        </div>
      )}
    </div>
  );
};

export default WishList;
