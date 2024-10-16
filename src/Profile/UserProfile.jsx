import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Button } from "@mui/material";
function UserProfile() {
  const handleLogOut = () => {};
  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center text-center">
      <div className="flex flex-col justify-center items-center">
        <AccountCircleIcon sx={{ fontSize: "10rem" }} />

        <h1 className="py-5 text-2xl font-semibold "> Code In behosh</h1>
        <p>Email: Codeinbehosh@gmail.com</p>
        <Button variant="contained" onClick={handleLogOut} sx={{ margin: "2rem 0rem" }}>
          LogOut
        </Button>
      </div>
    </div>
  );
}

export default UserProfile;
