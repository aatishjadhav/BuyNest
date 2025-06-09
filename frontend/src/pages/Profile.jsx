import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slices/authSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import MainProfile from "./MainProfile";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logout successfull!");
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
