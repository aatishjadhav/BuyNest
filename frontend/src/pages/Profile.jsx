import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slices/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import MainProfile from "./MainProfile";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("users"));

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logout successfull!");
    navigate("/");
  };

  return (
    <div>
      <MainProfile/>

      <div className="text-center py-3">
        <h4>My Profile</h4>
        <p>Name: {user?.name}</p>
        <p>Email: {user?.email}</p>
        <button onClick={handleLogout} className="btn btn-danger">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
