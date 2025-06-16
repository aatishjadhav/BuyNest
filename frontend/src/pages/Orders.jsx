import { useDispatch, useSelector } from "react-redux";
import MainProfile from "./MainProfile";
import { useEffect } from "react";
import { fetchOrders } from "../slices/orderSlice";

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
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "70vh" }}
          >
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div>
            {orders?.length > 0 ? (
              <div>
                {orders?.map((order, index) => (
                  <div className="card my-3" key={index}>
                    <div className="card-body">
                      <h5 className="card-title">Order #{order._id}</h5>

                      <div>
                        <p>
                          <b>Original Price:</b> ₹
                          {order.total + (order.discount || 0)}
                        </p>
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
