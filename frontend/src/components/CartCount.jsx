import { Link } from "react-router-dom";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useSelector } from "react-redux";

const CartCount = () => {
  const { cart } = useSelector((state) => state.cart);
  return (
    <div>
      <Link className="nav-link position-relative" to="/cart">
        <div className="position-relative d-inline-block">
          <MdOutlineShoppingCart size={26} />
          {cart.length > 0 && (
            <span
              className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
              style={{
                fontSize: "10px",
                padding: "6px 6px",
                minWidth: "18px",
              }}
            >
              {cart.length}
            </span>
          )}
        </div>
        <span className="mx-2 fw-bold">Cart</span>
      </Link>
    </div>
  );
};

export default CartCount;
