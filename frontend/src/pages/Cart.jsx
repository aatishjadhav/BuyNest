import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../slices/cartSlice";
import { addToWishlist } from "../slices/wishSlice";
import { Link, useNavigate } from "react-router-dom";
import { updateQuantity } from "../slices/cartSlice";
import { toast } from "react-toastify";
import CouponModal from "../components/Modals/CouponModal";
import { useState } from "react";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart } = useSelector((state) => state.cart);

  const [showCouponModal, setShowCouponModal] = useState(false);
  const { discountAmount, selectedCoupon } = useSelector(
    (state) => state.coupon
  );

  const calculatedPrice = cart.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0
  );

  const discountedPrice = cart.reduce((acc, curr) => {
    const discountValue = parseFloat(curr.discount) / 100;
    return acc + curr.price * curr.quantity * discountValue;
  }, 0);

  const deliveryCharges = calculatedPrice >= 1000 ? 500 : 0;
  const totalAmount =
    calculatedPrice - discountedPrice - discountAmount + deliveryCharges;

  const handleAdd = (item) => {
    dispatch(addToWishlist(item));
    toast.success(`${item.name} Moved to wishlist`);
  };

  const handleRemove = (itemId) => {
    dispatch(removeFromCart(itemId));
    toast.warning("Item removed from cart.");
  };

  return (
    <div className="container py-4">
      {cart.length > 0 ? (
        <>
          <h3 className="text-center mb-3">My Cart ({cart.length})</h3>
          <div className="row justify-content-center">
            <div className="col-md-7">
              {cart.map((item, index) => (
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
                      <h5 className="fw-bold mb-1">{item.name}</h5>
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <span className="fw-bold text-dark">₹{item.price}</span>
                        <span className="text-muted text-decoration-line-through">
                          ₹{item.originalPrice}
                        </span>
                      </div>

                      <div className="d-flex align-items-center gap-2 mb-3">
                        <button
                          onClick={() =>
                            dispatch(
                              updateQuantity({
                                _id: item._id,
                                quantity: item.quantity - 1,
                              })
                            )
                          }
                          className="btn btn-sm btn-outline-secondary"
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() =>
                            dispatch(
                              updateQuantity({
                                _id: item._id,
                                quantity: item.quantity + 1,
                              })
                            )
                          }
                          className="btn btn-sm btn-outline-secondary"
                        >
                          +
                        </button>
                      </div>

                      <div className="d-flex gap-3">
                        <button
                          className="btn w-50 fw-bold border border-dark text-dark"
                          style={{ backgroundColor: "transparent" }}
                          onClick={() => handleAdd(item)}
                        >
                          Add To Wishlist
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

            {/* Right Side: Price Details */}
            <div className="col-md-4">
              <div className="card container">
                <div className="">
                  {selectedCoupon ? (
                    <div className="mt-2 text-success">
                      Coupon Applied: <strong>{selectedCoupon.code}</strong> (₹
                      {discountAmount} off)
                    </div>
                  ) : (
                    <button
                      className="btn btn-outline-dark w-100 my-3"
                      onClick={() => setShowCouponModal(true)}
                    >
                      <i className="fas fa-tag mx-2"></i>
                      Apply Coupon
                    </button>
                  )}

                  <div>
                    <span>Price ({cart.length} items)</span>
                    <span className="float-end">₹{calculatedPrice}</span>
                  </div>
                  <div className="mt-2">
                    <span>Discount</span>
                    <span className="float-end">
                      - ₹{discountedPrice.toFixed(0)}
                    </span>
                  </div>
                  <div className="mt-2">
                    <span>Delivery Charges</span>
                    <span className="float-end">
                      {deliveryCharges === 0 ? "Free" : `₹${deliveryCharges}`}
                    </span>
                  </div>
                  <hr />
                  <div>
                    <b>Total Amount</b>
                    <span className="float-end fw-bold">₹{totalAmount}</span>
                  </div>
                  <hr />
                  <div>
                    <span>
                      You will save ₹{discountedPrice.toFixed(0)} on this order
                    </span>
                    <button
                      className="btn text-light w-100 mt-3 fw-bold"
                      style={{ backgroundColor: "#121932" }}
                      onClick={() => navigate("/checkout", { state: { fromCart: true } })}
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {showCouponModal && (
            <CouponModal onClose={() => setShowCouponModal(false)} />
          )}
        </>
      ) : (
        <div className="text-center py-5">
          <p className="display-5">
            <strong>Cart is Empty</strong>
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

export default Cart;
