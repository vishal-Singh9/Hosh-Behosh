import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";

const EventCard = () => {
  return (
    <div>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{
            height: "250px",
          }}
          image="https://cdn.pixabay.com/photo/2017/11/25/17/17/sandwich-2977251_640.jpg"
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            className="text-3xl"
          >
            Indian Fast Food
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            className="text-3xl"
          >
            50% off on First 
          </Typography>
          <div className="py-2 space-y-2">
            <p>{"Mumbai"}</p>
            <p className="text-sm text-blue-500"> November 10, 2024 12:00 AM</p>
            <p className="text-sm text-red-500"> November 13, 2024 12:00 PM</p>
          </div>
        </CardContent>
        {false && (
          <CardActions>
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </CardActions>
        )}
      </Card>
    </div>
  );
};

export default EventCard;
