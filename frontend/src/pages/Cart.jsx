import { useDispatch, useSelector } from "react-redux";
import { clearCart, removeFromCart } from "../slices/cartSlice";
import { addToWishlist } from "../slices/wishSlice";
import { Link, useNavigate } from "react-router-dom";
import { updateQuantity } from "../slices/cartSlice";
import { toast } from "react-toastify";
import { addNewOrder } from "../slices/orderSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart } = useSelector((state) => state.cart);
  console.log("cart data", cart);

  const calculatedPrice = cart.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0
  );

  const discountedPrice = cart.reduce((acc, curr) => {
    const discountValue = parseFloat(curr.discount) / 100;
    return acc + curr.price * curr.quantity * discountValue;
  }, 0);

  const deliveryCharges = calculatedPrice >= 1000 ? 500 : 0;
  const totalAmount = calculatedPrice - discountedPrice + deliveryCharges;

  const handleAdd = (item) => {
    dispatch(addToWishlist(item));
    dispatch(removeFromCart(item._id));
    navigate("/wishlist");
    toast.success("Product Moved to wishlist");
  };

  const handleRemove = (itemId) => {
    dispatch(removeFromCart(itemId));
    toast.warning("Product removed from cart.");
  };
  
  const placeOrder = async () => {
    const orderItems = cart.map((item) => ({
      productId: item._id,
      quantity: item.quantity,
    }));
  
    const orderData = {
      items: orderItems,
      total: totalAmount
    };
   console.log("order data", orderData);
   
    try {
      await dispatch(addNewOrder(orderData)).unwrap(); 
      toast.success("Order placed successfully!");
      dispatch(clearCart());
      navigate("/user/orders");
    } catch (error) {
      toast.error("Failed to place order. Please try again.");
      console.error("Order placement error:", error);
    }
  };
  

  return (
    <div className="container py-3">
      {cart.length > 0 ? (
        <>
          <h3 className="text-center">My Cart ({cart.length})</h3>
          <div className="py-1">
            <Link to="/products" className="btn btn-secondary">
              Back
            </Link>
          </div>
          <div className="row">
            {/* Left Side: Cart Items */}
            <div className="col-md-8">
              {cart.map((item, index) => (
                <div className="row py-3" key={index}>
                  <div className="col-md-12">
                    <div className="card mb-1">
                      <div className="row g-0">
                        <div className="col-md-4">
                          <img
                            src={item.imgUrl}
                            className="img-fluid rounded-start"
                            alt="Product"
                          />
                        </div>
                        <div className="col-md-8 px-5">
                          <div className="card-body">
                            <h5 className="card-title">{item.name}</h5>
                            <div className="d-flex gap-2">
                              <p className="card-text">
                                <b>₹{item.price}</b>
                              </p>
                              <span className="text-decoration-line-through">
                                ₹{item.originalPrice}
                              </span>
                            </div>
                            <span>{item.discount} off</span>
                            <p>
                              <b>Quantity: </b>{" "}
                              <button
                                onClick={() =>
                                  dispatch(
                                    updateQuantity({
                                      _id: item._id,
                                      quantity: item.quantity - 1,
                                    })
                                  )
                                }
                                className="btn btn-sm btn-outline-primary rounded-circle mx-2"
                              >
                                -
                              </button>
                              {item.quantity}{" "}
                              <button
                                onClick={() =>
                                  dispatch(
                                    updateQuantity({
                                      _id: item._id,
                                      quantity: item.quantity + 1,
                                    })
                                  )
                                }
                                className="btn btn-sm btn-outline-primary rounded-circle mx-2"
                              >
                                +
                              </button>
                            </p>
                            <button
                              className="btn btn-warning w-100"
                              onClick={() => handleRemove(item._id)}
                            >
                              Remove From Cart
                            </button>
                            <button
                              className="btn btn-warning w-100 mt-3"
                              onClick={() => handleAdd(item)}
                            >
                              Move To Wishlist
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Side: Price Details (Moved Outside of .map) */}
            <div className="col-md-4 mt-3">
              <div className="card container">
                <div className="card-title">
                  <h5 className="mt-3">PRICE DETAILS</h5>
                  <hr />
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
                    <span>
                      <b>TOTAL AMOUNT</b>
                    </span>
                    <span className="float-end">
                      <b>₹{totalAmount}</b>
                    </span>
                  </div>
                  <hr />
                  <div>
                    <span>
                      You will save ₹{discountedPrice.toFixed(0)} on this order
                    </span>
                    <button
                      className="btn btn-primary w-100 mt-3"
                      onClick={placeOrder}
                    >
                      Place Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-5">
          <p className="display-5">
            <strong>Cart is Empty</strong>
          </p>
          <Link to="/products" className="btn btn-primary my-3">
            Explore Products
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
