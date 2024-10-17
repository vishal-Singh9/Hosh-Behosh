import React from "react";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HomeIcon from "@mui/icons-material/Home";
import PaymentIcon from "@mui/icons-material/Payment";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import EventIcon from "@mui/icons-material/Event";
import LogoutIcon from "@mui/icons-material/Logout";
import { Divider, Drawer, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../State/Authentication/Action";

// Menu items with icons
const menu = [
  { title: "Orders", icon: <ShoppingBagIcon /> },
  { title: "Favorites", icon: <FavoriteIcon /> },
  { title: "Home", icon: <HomeIcon /> },
  { title: "Payment", icon: <PaymentIcon /> },
  { title: "Notifications", icon: <NotificationsActiveIcon /> },
  { title: "Events", icon: <EventIcon /> },
  { title: "Logout", icon: <LogoutIcon /> },
];

// Profile Navigation Component
const ProfileNavigation = ({ open, handleClose }) => {
  const isSmallScreen = useMediaQuery("(max-width: 800px)"); // Media query to detect small screens
  const isMediumScreen = useMediaQuery("(max-width: 1200px)"); // Media query to detect medium screens
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handle navigation based on the menu item clicked
  const handleNavigate = (item) => {
    if (item.title === "Logout") {
      dispatch(logout());
      navigate("/");
    } else if (item.title === "Home") {
      navigate("/");
    } else {
      navigate(`/my-profile/${item.title.toLowerCase()}`);
    }
  };

  return (
    <div>
      <Drawer
        variant={isSmallScreen ? "temporary" : "permanent"} // Conditional drawer type for mobile vs desktop
        anchor="left"
        open={open}
        onClose={handleClose}
        sx={{
          zIndex: 1,
          position: "sticky",
        }}
      >
        <div
          className={`flex flex-col justify-center text-lg pt-10 gap-4 md:gap-6 lg:gap-8 ${
            isSmallScreen ? "w-[75vw]" : isMediumScreen ? "w-[50vw]" : "w-[20vw]"
          } h-[100vh]`}
        >
          {menu.map((item, i) => (
            <div key={i} className="w-full">
              <div
                onClick={() => handleNavigate(item)}
                className="px-5 flex items-center space-x-4 cursor-pointer hover:bg-gray-100 transition-all duration-200 py-3"
              >
                {item.icon}
                <span>{item.title}</span>
              </div>
              {i !== menu.length - 1 && <Divider />} {/* Divider between menu items */}
            </div>
          ))}
        </div>
      </Drawer>
    </div>
  );
};

export default ProfileNavigation;
