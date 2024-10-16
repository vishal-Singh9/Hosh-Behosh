import React, { useEffect } from "react";
import ProfileNavigation from "./ProfileNavigation";
import { Routes, Route } from "react-router-dom";
import UserProfile from "./UserProfile";
import Orders from "./Orders";
import Address from "./Address";
import Events from "./Events";
import Notification from "./Notification";
import Favorites from "./Favorites";
const Profile = () => {
  const [openSidebar, setOpenSidebar] = React.useState(false);

useEffect(() => {
  setOpenSidebar(true);
  return () => {
    setOpenSidebar(false);
  }
}, []);
  return (
    <div className="lg:flex justify-between">
      <div className="sticky h-[80vh] lg:w-[20%]">
        <ProfileNavigation open={openSidebar} />
      </div>
      <div className="lg:w-[80%]">
        <Routes>
          <Route path="/notifications" element={<Notification />} />
          <Route path="/" element={<UserProfile />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/address" element={<Address />} />
          <Route path="/events" element={<Events />} />
          <Route path="/favorites" element={<Favorites/>} />
        </Routes>
      </div>
    </div>
  );
};

export default Profile;
