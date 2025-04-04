import { Link } from "react-router-dom";

const MainProfile = () => {
  return (
    <div className="text-center py-5 d-flex justify-content-center align-items-center gap-4 border-bottom">
        <Link className="fs-5 nav-link" to="/user/profile">
          Profile
        </Link>
        <Link className="fs-5 nav-link" to="/user/address">
          Addresses
        </Link>
        <Link className="fs-5 nav-link" to="/user/orders">
          Orders
        </Link>
      </div>
  );
};

export default MainProfile;
