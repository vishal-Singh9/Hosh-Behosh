import React from "react";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { logout } from "../State/Authentication/Action";
import { useSelector } from "react-redux";
function UserProfile() {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const {auth,user} = useSelector((store) => store);


  const handleLogOut = () => {
    dispatch(logout());
    Navigate("/");
  };

  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center text-center">
      <div className="flex flex-col justify-center items-center">
        <AccountCircleIcon sx={{ fontSize: "10rem" }} />

        <h1 className="py-5 text-2xl font-semibold ">{auth.email}</h1>
      {console.log(auth)}
        <p>Email: Codeinbehosh@gmail.com</p>
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
