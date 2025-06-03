import { NavLink } from "react-router-dom";

const MainProfile = () => {
  return (
    <>
      <div className="text-center mt-4 d-flex justify-content-center align-items-center gap-4">
  <NavLink
    to="/user/profile"
    className={({ isActive }) => (isActive ? "fs-5 nav-link fw-bold text-primary" : "fs-5 nav-link")}
  >
    Profile
  </NavLink>
  {/* <NavLink
    to="/user/address"
    className={({ isActive }) => (isActive ? "fs-5 nav-link fw-bold text-primary" : "fs-5 nav-link")}
  >
    Addresses
  </NavLink> */}
  <NavLink
    to="/user/orders"
    className={({ isActive }) => (isActive ? "fs-5 nav-link fw-bold text-primary" : "fs-5 nav-link")}
  >
    Orders
  </NavLink>
</div>

<hr />
    </>
  );
};

export default MainProfile;
