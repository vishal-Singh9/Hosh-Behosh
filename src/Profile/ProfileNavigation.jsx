import React, { useState } from "react";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HomeIcon from "@mui/icons-material/Home";
import PaymentIcon from "@mui/icons-material/Payment";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import EventIcon from "@mui/icons-material/Event";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import { Divider, Drawer, IconButton, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../State/Authentication/Action";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const menu = [
  { title: "Orders", icon: <ShoppingBagIcon /> },
  { title: "Favorites", icon: <FavoriteIcon /> },
  { title: "Home", icon: <HomeIcon /> },
  { title: "Payment", icon: <PaymentIcon /> },
  { title: "Notifications", icon: <NotificationsActiveIcon /> },
  { title: "Events", icon: <EventIcon /> },
  { title: "Logout", icon: <LogoutIcon /> },
];

const ProfileNavigation = () => {
  const [open, setOpen] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width: 800px)");
  const isMediumScreen = useMediaQuery("(max-width: 1200px)");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleToggle = () => setOpen(!open);

  const handleNavigate = (item) => {
    if (item.title === "Logout") {
      dispatch(logout());
      toast.success("Successfully logged out.");
      navigate("/");
    } else if (item.title === "Home") {
      navigate("/");
    } else {
      toast.info(`Navigating to ${item.title}`);
      navigate(`/my-profile/${item.title.toLowerCase()}`);
    }
    if (isSmallScreen) setOpen(false);
  };

  return (
    <div>
      {/* Three-dot menu button */}
      {isSmallScreen && (
        <IconButton
          onClick={handleToggle}
          sx={{
            position: "absolute",
            top: 16,
            left: 16,
            zIndex: 1300,
            backgroundColor: "#ff9800",
            color: "#fff",
            "&:hover": { backgroundColor: "#e65100" },
          }}
        >
          <MenuIcon />
        </IconButton>
      )}

      <Drawer
        variant={isSmallScreen ? "temporary" : "permanent"}
        anchor="left"
        open={open || !isSmallScreen}
        onClose={() => setOpen(false)}
        sx={{
          zIndex: 1200,
          "& .MuiDrawer-paper": {
            width: isSmallScreen ? "75vw" : isMediumScreen ? "50vw" : "20vw",
            boxSizing: "border-box",
            background: "linear-gradient(to bottom, #6a11cb, #2575fc)",
            color: "#fff",
            padding: "1rem",
          },
        }}
      >
        <div className=" mt-10 drawer-container flex flex-col text-lg pt-10 gap-4 md:gap-6 lg:gap-8">
          {menu.map((item, i) => (
            <div key={i} className="menu-item w-full">
              <div
                onClick={() => handleNavigate(item)}
                className="px-5 flex items-center space-x-4 cursor-pointer hover:bg-gradient-to-r hover:from-green-400 hover:to-blue-500 hover:text-black transition-all duration-300 py-3 rounded-lg shadow-md"
              >
                <span className="icon text-2xl">{item.icon}</span>
                <span className="font-semibold">{item.title}</span>
              </div>
              {i !== menu.length - 1 && <Divider sx={{ backgroundColor: "#fff" }} />}
            </div>
          ))}
        </div>
      </Drawer>
    </div>
  );
};

export default ProfileNavigation;