import { useDispatch, useSelector } from "react-redux";
import MainProfile from "./MainProfile";
import { useEffect } from "react";
import { fetchOrders } from "../slices/orderSlice";
import Loader from "../components/Loader";

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, status, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <div>
      <MainProfile />

      <div className="container py-3">
        <h3 className="text-center">My Orders</h3>
        {status === "loading" ? (
          <Loader/>
        ) : (
          <div>
            {orders?.length > 0 ? (
              <div>
                {orders?.map((order, index) => (
                  <div className="card my-3" key={index}>
                    <div className="card-body">
                      <h5 className="card-title">Order #{order._id}</h5>
                      {order.address && (
                        <div className="mb-3">
                          <h5 className="mb-1">Delivery Address:</h5>
                          <p className="mb-1">
                            <b>{order.address.fullName}</b>
                          </p>
                          <p className="mb-1">
                            {order.address.streetAddress},{" "}
                            {order.address.apartment}, {order.address.city}
                          </p>
                          <p className="mb-1">
                            {order.address.country} - {order.address.postalCode}
                          </p>
                          <p className="mb-0">
                            Phone: {order.address.phoneNumber}
                          </p>
                        </div>
                      )}
                      <div>
                        {/* <p>
                          <b>Original Price:</b> ₹
                          {order.total + (order.discount || 0)}
                        </p> */}
                        {order.appliedCoupon && (
                          <p>
                            <b>Coupon Applied:</b> {order.appliedCoupon} (-₹
                            {order.discount})
                          </p>
                        )}
                        <p>
                          <b>Total Paid:</b> ₹{order.total}
                        </p>
                      </div>

                      <h6>Items:</h6>
                      <ul>
                        {order?.items?.map((item, idx) => (
                          <li key={idx}>
                            <p>
                              {item?.productId?.name} - Quantity:{" "}
                              {item?.quantity}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-5">
                <p>No orders found.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
