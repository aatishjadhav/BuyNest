import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchProducts } from "../slices/productsSlice";
import {
  FaRegHeart,
  FaStar,
  FaRegStar,
  FaStarHalfAlt,
  FaHeart,
  FaShoppingCart,
} from "react-icons/fa";
import { addToCart } from "../slices/cartSlice";
import { addToWishlist, removeFromWishlist } from "../slices/wishSlice";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cart } = useSelector((state) => state.cart);
  const { wish } = useSelector((state) => state.wish);
  const user = useSelector((state) => state.auth.user);
  const { products, status, error } = useSelector((state) => state.products);

  const { productId } = useParams();
  const product = products.find((prod) => prod._id === productId);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Function to render stars with half stars
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

  if (!product) {
    return <p>Loading...</p>;
  }

  const handleAdd = (product) => {
    if (!user) {
      toast.error("You must be logged in to add items to the cart.");
      navigate("/login");
      return;
    }

    dispatch(addToCart(product));
    toast.success("Product added to cart.");
  };

  const handleAddToWishlist = (product) => {
    if (!user) {
      toast.error("You must be logged in to add items to the cart.");
      navigate("/login");
      return;
    }

    const isWishlisted = wish.some((item) => item?._id === product?._id);

    if (isWishlisted) {
      dispatch(removeFromWishlist(product._id));
      toast.warn("Removed from wishlist.");
    } else {
      dispatch(addToWishlist(product));
      toast.info("Added to wishlist.");
    }
  };

  const tagIcons = {
    "Fastest Delivery": "fas fa-truck",
    "Inclusive of All Taxes": "fas fa-tag",
    "Cash On Delivery Available": "fas fa-check-circle",
  };

  return (
    <div className="container py-3 d-flex justify-content-center py-5">
      <div
        className="p-4 shadow rounded bg-white"
        style={{
          maxWidth: "1000px",
          width: "100%",
        }}
      >
        <div className="row g-4">
          <div className="col-md-5">
            <div className="card border-0 shadow-sm">
              <div style={{ backgroundColor: "light", padding: "20px" }}>
                <img
                  src={product?.imgUrl || "https://via.placeholder.com/250"}
                  className="img-fluid"
                  alt={product?.name || "Product Image"}
                  style={{
                    height: "400px",
                    width: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>
            </div>
          </div>

          <div className="col-md-7">
            <h3>{product.name}</h3>

            <div className="d-flex align-items-center mb-2">
              <p className="mb-0 me-2">{product.rating}</p>
              <div className="d-flex">{renderStars(product.rating)}</div>
            </div>

            <div className="d-flex gap-2 mb-2">
              <h5>₹{product.price}</h5>
              <span className="text-decoration-line-through text-muted">
                ₹{product.originalPrice}
              </span>
            </div>

            <p className="fw-semibold mb-3" style={{ color: "#7685ab" }}>
              {product.description}
            </p>

            <div className="mb-3">
              {product.tags?.map((tag, idx) => (
                <div key={idx} className="py-1">
                  <i className={`${tagIcons[tag]} tag-icon`}></i>
                  <span className="px-2">{tag}</span>
                </div>
              ))}
            </div>

            <div className="d-grid gap-2">
              {cart.some((item) => item?._id === product?._id) ? (
                <button
                  className="btn text-white fw-bold d-flex align-items-center justify-content-center p-2"
                  style={{
                    backgroundColor: "#121932",
                    gap: "10px",
                    borderRadius: "8px",
                  }}
                  onClick={() => navigate("/cart")}
                >
                  <FaShoppingCart size={18} />
                  Go To Cart
                </button>
              ) : (
                <button
                  className="btn text-white fw-bold d-flex align-items-center justify-content-center p-2"
                  style={{
                    backgroundColor: "#121932",
                    gap: "10px",
                    borderRadius: "8px",
                  }}
                  onClick={() => handleAdd(product)}
                >
                  <FaShoppingCart size={18} />
                  Add To Cart
                </button>
              )}

              {wish.some((item) => item?._id === product?._id) ? (
                <button
                  className="btn fw-bold d-flex align-items-center justify-content-center p-2 w-100"
                  style={{
                    border: "2px solid #121932",
                    backgroundColor: "transparent",
                    color: "#121932",
                    gap: "10px",
                    borderRadius: "8px",
                    transition: "all 0.3s ease",
                  }}
                  onClick={() => navigate("/wishlist")}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = "#121932";
                    e.currentTarget.style.color = "white";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "#121932";
                  }}
                >
                  <FaHeart size={18} />
                  Go To Wishlist
                </button>
              ) : (
                <button
                  className="btn fw-bold d-flex align-items-center justify-content-center p-2 w-100"
                  style={{
                    border: "2px solid #121932",
                    backgroundColor: "transparent",
                    color: "#121932",
                    gap: "10px",
                    borderRadius: "8px",
                    transition: "all 0.3s ease",
                  }}
                  onClick={() => handleAddToWishlist(product)}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = "#121932";
                    e.currentTarget.style.color = "white";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "#121932";
                  }}
                >
                  <FaHeart size={18} />
                  Add To Wishlist
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
