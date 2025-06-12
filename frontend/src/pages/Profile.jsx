import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slices/authSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import MainProfile from "./MainProfile";
import { useEffect, useRef } from "react";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

const loggedOutManually = useRef(false);
const hasShownToast = useRef(false); 

useEffect(() => {
  if (!user && !loggedOutManually.current && !hasShownToast.current) {
    hasShownToast.current = true; 
    toast.error("You must be logged in to view your profile.");
    navigate("/login");
  }
}, [user, navigate]);

  const handleLogout = () => {
    loggedOutManually.current = true; 
    dispatch(logout());
    toast.success("Logout successful!");
    navigate("/");
  };
  return (
    <div>
      <MainProfile />

      <div className="row justify-content-center">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6">
          <div className="card text-center shadow p-4">
            <h2 className="card-title mb-4">User Profile</h2>
            <div className="card-body">
              <img
                src="https://i.imgur.com/LDOO4Qs.jpg"
                alt="profile"
                className="img-fluid rounded-circle mb-3"
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "cover",
                }}
              />
              <p className="card-text fw-bold">Full Name: {user?.name}</p>
              <p className="card-text fw-bold">Email: {user?.email}</p>
              <button onClick={handleLogout} className="btn btn-danger mt-3">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
