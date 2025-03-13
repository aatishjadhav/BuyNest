import { FaRegHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const WishlistCount = () => {
  const { wish } = useSelector((state) => state.wish);
  return (
    <div>
      <Link className="nav-link position-relative" to="/wishlist">
        <FaRegHeart size={22} />
        {wish?.length > 0 && (
          <span
            className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
            style={{
              fontSize: "10px",
              padding: "6px 6px",
              minWidth: "18px",
            }}
          >
            {wish.length}
          </span>
        )}
      </Link>
    </div>
  );
};

export default WishlistCount;
