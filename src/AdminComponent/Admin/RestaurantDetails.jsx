import React from "react";
import { Button, Card, CardContent, CardHeader, Grid } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurantById, updateRestaurantStatus } from "../../State/Restaurant/Action";

const RestaurantDetails = () => {
  const dispatch = useDispatch();
  const { restaurant } = useSelector((store) => store);
  const token = localStorage.getItem("token");

  const handleRestaurantStatus = (e) => {
    e.preventDefault()
    dispatch(
      updateRestaurantStatus({
        restaurantId: restaurant?.userRestaurants?.restaurantId,
        token: token,
      })
    );
 
  };

  return (
    <div className="lg:px-20 pb-10 bg-gradient-to-r from-gray-100 to-gray-200">
      {/* Header */}
      <div className="py-10 flex flex-col items-center gap-4 text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 drop-shadow-lg">
          {restaurant?.userRestaurants?.name}
        </h1>
        <Button
          color={restaurant?.userRestaurants?.open ? "primary" : "error"}
          size="large"
          variant="contained"
          onClick={handleRestaurantStatus}
        >
          {restaurant?.userRestaurants?.open ? "Close Restaurant" : "Open Restaurant"}
        </Button>
      </div>

      {/* Restaurant Details Section */}
      <Grid container spacing={4} className="mb-6">
        <Grid item xs={12}>
          <Card className="shadow-2xl transform transition-transform hover:scale-105">
            <CardHeader
              title={
                <span className="text-xl font-semibold text-gray-600">
                  Restaurant Details
                </span>
              }
              className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-2 rounded-t-lg"
            />
            <CardContent>
              <div className="space-y-4">
                {renderDetail("Owner", restaurant?.userRestaurants?.owner?.fullName)}
                {renderDetail("Restaurant Name", restaurant?.userRestaurants?.name)}
                {renderDetail("Cuisine Type", restaurant?.userRestaurants?.cuisineType)}
                {renderDetail("Opening Hours", restaurant?.userRestaurants?.openingHours)}
                <div className="flex">
                  <p className="w-48 font-semibold">Status</p>
               
                    {restaurant?.userRestaurants?.open ? "Open" : "Closed"}
                
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>

        {/* Address Section */}
        <Grid item xs={12} md={6}>
          <Card className="shadow-2xl transform transition-transform hover:scale-105">
            <CardHeader
              title={
                <span className="text-xl font-semibold text-gray-600">
                  Address
                </span>
              }
              className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-2 rounded-t-lg"
            />
            <CardContent>
              <div className="space-y-4">
                {renderDetail("Country", restaurant?.userRestaurants?.address?.country)}
                {renderDetail("City", restaurant?.userRestaurants?.address?.city)}
                {renderDetail("Pin Code", restaurant?.userRestaurants?.address?.pinCode)}
                {renderDetail("Street Address", restaurant?.userRestaurants?.address?.street)}
              </div>
            </CardContent>
          </Card>
        </Grid>

        {/* Contact Section */}
        <Grid item xs={12} md={6}>
          <Card className="shadow-2xl transform transition-transform hover:scale-105">
            <CardHeader
              title={
                <span className="text-xl font-semibold text-gray-600">
                  Contact Details
                </span>
              }
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 rounded-t-lg"
            />
            <CardContent>
              <div className="space-y-4">
                {renderDetail(
                  "Email",
                  restaurant?.userRestaurants?.contactInformation?.email
                )}
                {renderDetail(
                  "Mobile",
                  restaurant?.userRestaurants?.contactInformation?.mobile
                )}
                <div className="flex">
                  <p className="w-48 font-semibold">Social</p>
                  <div className="flex space-x-4 text-2xl">
                    <a
                      href="https://www.instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pink-500 hover:text-pink-700 transform hover:scale-110"
                    >
                      <InstagramIcon />
                    </a>
                    <a
                      href="https://wa.me/1234567890"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-500 hover:text-green-700 transform hover:scale-110"
                    >
                      <WhatsAppIcon />
                    </a>
                    <a
                      href="https://www.facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700 transform hover:scale-110"
                    >
                      <FacebookIcon />
                    </a>
                    <a
                      href="https://www.twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-600 transform hover:scale-110"
                    >
                      <TwitterIcon />
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

// Helper function to render detail rows
const renderDetail = (label, value) => (
  <div className="flex">
    <p className="w-48 font-medium text-gray-700">{label}</p>
    <p className="text-gray-600">{value}</p>
  </div>
);

export default RestaurantDetails;
