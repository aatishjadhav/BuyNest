import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../slices/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
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

  return (
    <div className="container py-5">
      <h3 className="text-center">My Cart ({cart.length})</h3>
      {cart.map((item) => (
        <>
          <div className="row py-3">
            <div className="col-md-6">
              <div class="card mb-3">
                <div class="row g-0">
                  <div class="col-md-4">
                    <img
                      src={item.imgUrl}
                      class="img-fluid rounded-start"
                      alt="..."
                    />
                  </div>
                  <div class="col-md-8 px-5">
                    <div class="card-body">
                      <h5 class="card-title">{item.name}</h5>
                      <div className="d-flex gap-2">
                        <p class="card-text">
                          <b>₹{item.price}</b>
                        </p>
                        <span className="text-decoration-line-through">
                          ₹{item.originalPrice}
                        </span>
                      </div>
                      <span>{item.discount}off</span>
                      <p>
                        <b>Quantity: </b>  <button className="btn btn-sm btn-outline-primary rounded-circle mx-2">-</button>
                        {item.quantity}  <button className="btn btn-sm btn-outline-primary rounded-circle mx-2">+</button>
                      </p>
                      <button
                        className="btn btn-warning w-100"
                        onClick={() => dispatch(removeFromCart(item._id))}
                      >
                        Remove From Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card container">
                <div className="card-title">
                  <h5 className="mt-3">PRICE DETAILS</h5>
                  <hr />
                  <div>
                    <span>Price ({item.quantity} item)</span>
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
                    <span className="float-end">{deliveryCharges === 0 ? "Free" : `₹${deliveryCharges}`}</span>
                  </div>
                  <hr />
                  <div className="">
                    <span>
                      <b>TOTAL AMOUNT</b>
                    </span>
                    <span className="float-end">
                      <b>₹{totalAmount}</b>
                    </span>
                  </div>
                  <hr />
                  <div className="">
                    <span>
                      You will save ₹{discountedPrice.toFixed(0)} on this order
                    </span>
                    <button className="btn btn-primary w-100 mt-3">
                      Place Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default Cart;
