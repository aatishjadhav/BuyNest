import { addNewOrder } from "../slices/orderSlice";
import { clearCart } from "../slices/cartSlice";
import { clearCoupon } from "../slices/couponSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchAddress } from "../slices/addressSlice";
import toast from "react-hot-toast";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart } = useSelector((state) => state.cart);
  const { addresses } = useSelector((state) => state.address);

  const { discountAmount, selectedCoupon } = useSelector(
    (state) => state.coupon
  );

  const [selectedAddressId, setSelectedAddressId] = useState(null);

  const selectedAddress = addresses.find((a) => a._id === selectedAddressId);

  const calculatedPrice = cart.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0
  );
  const discountedPrice = cart.reduce((acc, curr) => {
    const discountValue = parseFloat(curr.discount || 0) / 100;
    return acc + curr.price * curr.quantity * discountValue;
  }, 0);
  const deliveryCharges = calculatedPrice >= 1000 ? 500 : 0;
  const totalAmount =
    calculatedPrice - discountedPrice - discountAmount + deliveryCharges;

  const placeOrder = async () => {
    if (!selectedAddress) {
      toast.error("Please select a delivery address");
      return;
    }
    isPlacingOrder.current = true;
    const orderItems = cart.map((item) => ({
      cartId: item._id,
      quantity: item.quantity,
    }));

    const orderData = {
      items: orderItems,
      total: totalAmount,
      appliedCoupon: selectedCoupon?.code || null,
      discount: discountAmount || 0,
      address: selectedAddress,
    };

    try {
      await dispatch(addNewOrder(orderData)).unwrap();

      dispatch(clearCart());
      dispatch(clearCoupon());

      toast.success("Order placed successfully!");
      navigate("/user/orders");
    } catch (error) {
      toast.error("Failed to place order. Please try again.");
      console.error("Order placement error:", error);
    }
  };
  useEffect(() => {
    dispatch(fetchAddress());
  }, []);

  useEffect(() => {
    if (addresses.length > 0 && !selectedAddressId) {
      setSelectedAddressId(addresses[0]._id);
    }
  }, [addresses, selectedAddressId]);

  return (
    <div className="container py-3">
      <div className="row">
        {/* Left: Address Selection */}
        <div className="col-md-7">
          <h4 className="py-2">Select Delivery Address</h4>
          {addresses.map((address) => (
            <div
              key={address._id}
              className={`card p-3 mb-3 d-flex flex-row align-items-start gap-2 ${
                selectedAddressId === address._id ? "border-primary" : ""
              }`}
              style={{ cursor: "pointer" }}
              onClick={() => setSelectedAddressId(address._id)}
            >
              <input
                type="radio"
                name="address"
                value={address._id}
                checked={selectedAddressId === address._id}
                onChange={() => setSelectedAddressId(address._id)}
                style={{ marginTop: "6px" }}
              />
              <div>
                <h6 className="mb-1">{address.fullName}</h6>
                <p className="mb-1">
                  {address.streetAddress}, {address.apartment}, {address.city}
                </p>
                <p className="mb-1">
                  {address.country}, {address.postalCode}
                </p>
                <p className="mb-0">Phone: {address.phoneNumber}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="col-md-4 py-5">
          <div className="card container">
            <div className="">
              <h3 className="text-center py-2">Order Details</h3>
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
                <div className="py-3">
                  <h3 className="text-center">Deliver To</h3>
                  <h5 className="mb-2">{selectedAddress?.fullName}</h5>
                  <p className="mb-1">
                    {selectedAddress?.streetAddress},{" "}
                    {selectedAddress?.apartment}, {selectedAddress?.city}
                  </p>
                  <p className="mb-1">
                    {selectedAddress?.country}, {selectedAddress?.postalCode}
                  </p>
                  <p className="mb-0">
                    Phone Number: {selectedAddress?.phoneNumber}
                  </p>
                  <button
                    className="btn text-light w-100 mt-3 fw-bold p-2"
                    style={{ backgroundColor: "#121932" }}
                    onClick={placeOrder}
                  >
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
