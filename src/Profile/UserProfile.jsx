import React from "react";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { logout } from "../State/Authentication/Action";
import { useSelector } from "react-redux";
function UserProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {auth,cart} = useSelector((store) => store);



  const handleLogOut = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleAvatar = () => {
    if (auth?.user?.role === "ROLE_CUSTOMER") {
      navigate("/my-profile");
    } else {
      navigate("/admin/restaurants");
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center text-center">
      <div className="flex flex-col justify-center items-center">
        <AccountCircleIcon onClick={handleAvatar} sx={{ fontSize: "10rem" }} />

        <h1 className="py-5 text-2xl font-semibold ">{auth?.user?.fullName}</h1>
        <p>Email: {auth?.user?.email}</p>
        <Button
          variant="contained"
          onClick={handleLogOut}
          sx={{ margin: "2rem 0rem" }}
        >
          LogOut
        </Button>
      </div>
    </div>
  );
}

export default UserProfile;
