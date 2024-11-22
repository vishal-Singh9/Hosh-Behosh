import { Button, Card, CardContent, CardHeader, Grid } from "@mui/material";
import React from "react";

const RestaurantDetails = () => {
  const handleRestaurantStatus = () => {};
  return (
    <div className="lg: px-20 py-10">
      <div className="py-5 flex justify-center items-center gap-5 ">
        <h1>Hosh beheosh</h1>
        <div>
          <Button
            color={true ? "primary" : "error"}
            size="large"
            className="py-[1rem] px-[2rem]"
            variant="contained"
            onClick={handleRestaurantStatus}
          >
            {true ? "Close" : "Open"}
          </Button>
        </div>
      </div>

      <Grid item xs={12}>
        <Card>
          <CardHeader
            title={<span className="text-gray-500">Restaurant Details</span>}
          />
          <CardContent>
            <div className="space-y-4 text-gray-200">
              <div className="flex">
                <p className="w-48">Owner</p>
                <p className="text-gray-400">
                  <span className="pr-55">Hosh Beheosh</span>
                </p>
              </div>
              <div className="flex">
                <p className="w-48">Restaurant Name</p>
                <p className="text-gray-400">
                  <span className="pr-55">Hosh Beheosh</span>
                </p>
              </div>
              <div className="flex">
                <p className="w-48">Cuisine Type</p>
                <p className="text-gray-400">
                  <span className="pr-55">Hosh BeHeosh</span>
                </p>
              </div>
              <div className="flex">
                <p className="w-48">Opening Hours</p>
                <p className="text-gray-400">
                  <span className="pr-55"> Hosh Beheosh</span>
                </p>
              </div>
              <div className="flex">
                <p className="w-48">Status</p>
                <p className="text-gray-400">
                  {true ? (
                    <span className="px-5 py-2 rounded-full text-black bg-green-400">
                      Open
                    </span>
                  ) : (
                    <span className="px-5 py-2 rounded-full text-black bg-red-400">
                      Closed
                    </span>
                  )}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Card>
          <CardHeader
            title={<span className="text-gray-500">Restaurant Details</span>}
          />
          <CardContent>
            <div className="space-y-4 text-gray-200">
              <div className="flex">
                <p className="w-48">Owner</p>
                <p className="text-gray-400">
                  <span className="pr-55">Hosh Beheosh</span>
                </p>
              </div>
              <div className="flex">
                <p className="w-48">Restaurant Name</p>
                <p className="text-gray-400">
                  <span className="pr-55">Hosh Beheosh</span>
                </p>
              </div>
              <div className="flex">
                <p className="w-48">Cuisine Type</p>
                <p className="text-gray-400">
                  <span className="pr-55">Hosh BeHeosh</span>
                </p>
              </div>
              <div className="flex">
                <p className="w-48">Opening Hours</p>
                <p className="text-gray-400">
                  <span className="pr-55"> Hosh Beheosh</span>
                </p>
              </div>
              <div className="flex">
                <p className="w-48">Status</p>
                <p className="text-gray-400">
                  {true ? (
                    <span className="px-5 py-2 rounded-full text-black bg-green-400">
                      Open
                    </span>
                  ) : (
                    <span className="px-5 py-2 rounded-full text-black bg-red-400">
                      Closed
                    </span>
                  )}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
};

export default RestaurantDetails;
