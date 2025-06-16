import { useDispatch } from "react-redux";
import { applyCoupon } from "../../slices/couponSlice";
import "./couponmodal.css";

const coupons = [
  { code: "SAVE100", discount: 100, description: "Flat ₹100 off" },
  { code: "SAVE50", discount: 50, description: "₹50 off on orders above ₹500" },
];

const CouponModal = ({ onClose }) => {
  const dispatch = useDispatch();

  const handleApply = (coupon) => {
    dispatch(applyCoupon(coupon));
    onClose();
  };

  return (
    
       <div className="modal-overlay">
      <div className="modal-content">
        <h5>Select a Coupon</h5>
        <hr />
        {coupons.map((coupon) => (
          <div
            key={coupon.code}
            className="border p-2 mb-2 d-flex justify-content-between align-items-center"
          >
            <div>
              <b>{coupon.code}</b>
              <p className="mb-0 text-muted small">{coupon.description}</p>
            </div>
            <button
              className="btn btn-sm btn-success"
              onClick={() => handleApply(coupon)}
            >
              Apply
            </button>
          </div>
        ))}
        <button className="btn btn-sm btn-danger mt-3" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default CouponModal;
