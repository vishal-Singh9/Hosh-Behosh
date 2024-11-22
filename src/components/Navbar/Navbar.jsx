import { Avatar, Badge, Box, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import React from "react";
import { Person } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { toast } from "react-toastify"; 
import "/styles/Navbar.css";

function Navbar() {
  const { auth, cart } = useSelector((store) => store);
  const navigate = useNavigate();

  const handleAvatarClick = () => {
    if (auth?.user?.role === "ROLE_CUSTOMER") {
      navigate("/my-profile");
    } else {
      navigate("/admin/restaurant");
    }
  };

  const handleFavoritesClick = () => {
    if (auth.user) {
      navigate("/my-profile/favorites");
    } else {
      toast.error("Please log in to view your favorites.");
      navigate("/account/login");
    }
  };

  const handleCartClick = () => {
    if (auth.user) {
      navigate("/cart");
    } else {
      toast.error("Please log in to view your cart.");
      navigate("/account/login");
    }
  };

  return (
    <Box className="navbar-container px-5 sticky top-0 z-50 py-[.9rem] lg:px-20 flex justify-between items-center">
      <div className="lg:mr-10 cursor-pointer flex items-center space-x-4">
        <div
          onClick={() => navigate("/")}
          className="logo font-semibold text-2xl text-white"
        >
          |-|osh BeHosh
        </div>
      </div>
      <div className="flex items-center space-x-4 justify-end">
        <div>
          <IconButton onClick={handleFavoritesClick}>
            <FavoriteIcon sx={{ fontSize: "1.5rem", color: "black" }} />
          </IconButton>
        </div>
        <div className="">
          {auth.user ? (
            <Avatar
              onClick={handleAvatarClick}
              sx={{ bgcolor: "white", color: "pink" }}
            >
              {auth.user?.fullName[0].toUpperCase()}
            </Avatar>
          ) : (
            <IconButton
              onClick={() => {
                toast.info("Please log in to access your account.");
                navigate("/account/login");
              }}
            >
              <Person />
            </IconButton>
          )}
        </div>
        <div>
          <IconButton onClick={handleCartClick}>
            <Badge color="red" badgeContent={cart?.cartItems?.length || 0}>
              <ShoppingCartIcon sx={{ fontSize: "1.5rem", color: "black" }} />
            </Badge>
          </IconButton>
        </div>
      </div>
    </Box>
  );
}

export default Navbar;
