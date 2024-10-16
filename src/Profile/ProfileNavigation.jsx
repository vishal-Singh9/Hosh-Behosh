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

const menu = [
  {
    title: "Orders",
    icon: <ShoppingBagIcon />,
  },
  {
    title: "Favorites",
    icon: <FavoriteIcon />,
  },
  {
    title: "Home",
    icon: <HomeIcon />,
  },
  {
    title: "Payment",
    icon: <PaymentIcon />,
  },
  {
    title: "Notifications",
    icon: <NotificationsActiveIcon />,
  },
  {
    title: "Events",
    icon: <EventIcon />,
  },
  {
    title: "Logout",
    icon: <LogoutIcon />,
  },
];

const ProfileNavigation = ({ open, handleClose }) => {
  const isSmallScreen = useMediaQuery("(max-width: 800px)");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNavigate = (item) => {
    if (item.title === "Logout") {
      dispatch(logout());
      navigate("/");
    } else if (item.title === "Home") {
      navigate("/");
    } else if (item.title === "Payment") {
      navigate("/my-profile/payment");
    } else if (item.title === "Notifications") {
      navigate("/my-profile/notifications");
    } else if (item.title === "Events") {
      navigate("/my-profile/events");
    } else if (item.title === "Orders") {
      navigate("/my-profile/orders");
    } else if (item.title === "Favorites") {
      navigate("/my-profile/favorites");
    }
  };

  return (
    <div>
      <Drawer
        variant={isSmallScreen ? "temporary" : "permanent"}
        anchor="left"
        open={open}
        onClose={handleClose}
        sx={{
          zIndex: 1,
          position: "sticky",
        }}
      >
        <div className="w-[75vw] sm:w-[50vw] md:w-[30vw] lg:w-[20vw] h-[100vh] flex flex-col justify-center text-lg lg:text-xl pt-10 gap-8">
          {menu.map((item, i) => {
            return (
              <div key={i} className="w-full">
                <div
                  onClick={() => handleNavigate(item)}
                  className="px-5 flex items-center space-x-5 cursor-pointer hover:bg-gray-100 transition-all duration-200 py-3"
                >
                  {item.icon}
                  <span>{item.title}</span>
                </div>
                {i !== menu.length - 1 && <Divider />}
              </div>
            );
          })}
        </div>
      </Drawer>
    </div>
  );
};

export default ProfileNavigation;
