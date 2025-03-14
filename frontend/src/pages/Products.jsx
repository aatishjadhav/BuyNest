import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProducts,
  filterProducts,
  setFilters,
} from "../slices/productsSlice";
import { FaRegHeart, FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { addToCart } from "../slices/cartSlice";
import { useNavigate } from "react-router-dom";
import { addToWishlist } from "../slices/wishSlice";

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { filteredProducts, products, status, error, filters } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAdd = (product) => {
    dispatch(addToCart(product));
    navigate("/cart");
  };

  const handleAddToWishlist = (e, product) => {
    e.stopPropagation(); // Prevent event bubbling
    dispatch(addToWishlist(product));
    navigate("/wishlist");
  };

  const handleRatingChange = (event) => {
    const ratingValue = parseInt(event.target.value, 10); 
    dispatch(setFilters({ rating: ratingValue }));
    dispatch(filterProducts());
  };

  const handleSort = (sortBy) => {
    dispatch(setFilters({ sortBy }));
    dispatch(filterProducts());
  };

  const handlePriceChange = (e) => {
    const newPrice = parseInt(e.target.value, 10);
    dispatch(setFilters({ maxPrice: newPrice }));
    dispatch(filterProducts());
 }

  const handleCategory = (event) => {
    const { value, checked } = event.target;
    dispatch(setFilters({category: checked ? [...filters.category, value] : filters.category.filter(cat => cat !== value)}));
    dispatch(filterProducts());
  };

 

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

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3 col-lg-2 bg-white p-4">
          <h5 className="fw-bold">
            Filters <span className="text-primary float-end">Clear</span>
          </h5>

          {/* Price Slider */}
         {/* Price Filter */}
<div className="mb-4">
  <h6>Price</h6>
  
  {/* Price Labels */}
  <div className="d-flex justify-content-between px-2">
    {[0, 2000, 4000, 6000, 8000].map((price) => (
      <span key={price} className="small">
        {price / 1000}k
      </span>
    ))}
  </div>

  {/* Price Slider */}
  <input
    type="range"
    className="form-range"
    min="0"
    max="8000"
    step="2000"
    value={filters.maxPrice}
    onChange={handlePriceChange}
  />

  {/* Selected Price Display */}
  <p>Up to ₹{filters.maxPrice.toLocaleString()}</p>
</div>


          {/* Category */}
          <div className="mb-4">
            <h6>Category</h6>
           
            <div className="form-check">
              <label>
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="category"
                  value="Men's"
                  onChange={handleCategory}
                />{" "}
                Men's
              </label>
            </div>
            <div className="form-check">
              <label>
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="category"
                  value="Women's"
                  onChange={handleCategory}
                />{" "}
                Women's
              </label>
            </div>
          </div>

          {/* Rating */}
          <div className="mb-4">
            <h6>Rating</h6>
            {[
              "4 Stars & above",
              "3 Stars & above",
              "2 Stars & above",
              "1 Star & above",
            ].map((rating, index) => (
              <div className="form-check" key={index}>
                <input
                  className="form-check-input"
                  type="radio"
                  name="rating"
                  id={`rating${index}`}
                  value={5 - index}
                  onChange={handleRatingChange}
                />
                <label className="form-check-label" htmlFor={`rating${index}`}>
                  {rating}
                </label>
              </div>
            ))}
          </div>

          {/* Sort By */}
          <div>
            <h6>Sort by</h6>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="sort"
                id="sort1"
                onChange={() => handleSort("lowToHigh")}
              />
              <label className="form-check-label" htmlFor="sort1">
                Price - Low to High
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="sort"
                id="sort2"
                onChange={() => handleSort("highToLow")}
              />
              <label className="form-check-label" htmlFor="sort2">
                Price - High to Low
              </label>
            </div>
          </div>
        </div>
        <div className="col-md-9 col-lg-10 bg-light">
          <h5 className="fw-bold my-3">
            Showing All Products ({filteredProducts.length})
          </h5>
          {status === "loading" && <p>Loading...</p>}
          {error && <p>{error}</p>}
          <div className="row g-4">
            {filteredProducts.map((product, index) => (
              <div className="col-md-4 mb-3" key={index}>
                <div className="card">
                  <div style={{ backgroundColor: "light", padding: "20px" }}>
                    <img
                      src={product.imgUrl}
                      className="img-fluid"
                      alt="Product"
                      style={{
                        height: "250px",
                        width: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </div>

                  <div
                    className="card-img-overlay p-2 d-flex justify-content-end"
                    style={{ pointerEvents: "none" }}
                  >
                    <button
                      onClick={(e) => handleAddToWishlist(e, product)}
                      className="btn rounded-circle"
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                        width: "40px",
                        height: "40px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "none",
                        pointerEvents: "auto",
                      }}
                    >
                      <FaRegHeart size={20} />
                    </button>
                  </div>

                  <div className="card-body text-center">
                    <Link
                      to={`/products/${product._id}`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <h6 className="fw-bold">{product.name}</h6>
                    </Link>
                    <Link
                      to={`/products/${product._id}`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <p className="fw-bold">₹{product.price}</p>
                    </Link>
                    <div className="d-flex align-items-center mb-2">
                      <p className="mb-0 me-2">{product.rating}</p>
                      <div className="d-flex">
                        {renderStars(product.rating)}
                      </div>
                    </div>
                    <button
                      className="btn btn-primary w-100"
                      onClick={() => handleAdd(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
