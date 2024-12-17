import React, { useState } from "react";
import {
  AdminPanelSettings,
  Category,
  Dashboard,
  Event,
  Fastfood,
  Logout,
  Menu as MenuIcon,
  ShoppingBag,
  ShopTwo,
} from "@mui/icons-material";
import { Divider, Drawer, IconButton, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../State/Authentication/Action";

const menu = [
  { title: "Dashboard", icon: <Dashboard />, path: "/" },
  { title: "Orders", icon: <ShoppingBag />, path: "/orders" },
  { title: "Menu", icon: <ShopTwo />, path: "/menu" },
  { title: "Food category", icon: <Category />, path: "/category" },
  { title: "Ingredients", icon: <Fastfood />, path: "/ingredients" },
  { title: "Events", icon: <Event />, path: "/events" },
  { title: "Details", icon: <AdminPanelSettings />, path: "/details" },
  { title: "Logout", icon: <Logout />, path: "/" },
];

const AdminSideBar = () => {
  const [open, setOpen] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width: 800px)");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleDrawer = () => setOpen(!open);

  const handleNavigate = (item) => {
    navigate(`/admin/restaurants${item.path}`);
    if (item.title === "Logout") {
      navigate("/");
      dispatch(logout());
      setOpen(false);
    }
  };

  return (
    <div className="relative">
      {/* Three Dots Menu */}
      {isSmallScreen && (
        <div className="absolute top-4 left-4">
          <IconButton onClick={toggleDrawer}>
            <MenuIcon sx={{ fontSize: 32, color: "black" }} />
          </IconButton>
        </div>
      )}

      {/* Sidebar */}
      <Drawer
        variant={isSmallScreen ? "temporary" : "permanent"}
        onClose={toggleDrawer}
        open={open || !isSmallScreen}
        anchor="left"
        sx={{
          zIndex: 1201,
          ".MuiDrawer-paper": {
            width: isSmallScreen ? "70vw" : "20%",
            background: "linear-gradient(to bottom, #3b82f6, #6366f1)",
            color: "white",
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        <div className="mt-10 h-screen flex flex-col justify-between">
          {/* Menu Items */}
          <div className="text-xl space-y-2">
            {menu.map((item, i) => (
              <React.Fragment key={i}>
                <div
                  onClick={() => handleNavigate(item)}
                  className="px-5 py-5 flex items-center gap-5 cursor-pointer hover:bg-blue-500 transition duration-200 ease-in-out"
                >
                  {item.icon}
                  <span>{item.title}</span>
                </div>
                {i !== menu.length - 1 && <Divider sx={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }} />}
              </React.Fragment>
            ))}
          </div>

          {/* Footer */}
          <div className="text-center py-4 text-sm opacity-70">
            &copy; 2024 Hosh Behosh
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default AdminSideBar;
