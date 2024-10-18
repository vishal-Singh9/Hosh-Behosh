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
import "/Users/indianic/Desktop/Swimmy/styles/EventCard.css"

const EventCard = () => {
  return (
    <div>
      <Card className="event-card" sx={{ maxWidth: 345 }}>
        <CardMedia
          className="event-card-media"
          sx={{
            height: "250px",
          }}
          image="https://cdn.pixabay.com/photo/2017/11/25/17/17/sandwich-2977251_640.jpg"
        />
        <CardContent className="event-card-content">
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            className="event-card-title"
          >
            Indian Fast Food
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            className="event-card-description"
          >
            50% off on First
          </Typography>
          <div className="py-2 space-y-2">
            <p className="event-card-location">{"Mumbai"}</p>
            <p className="event-card-date start">
              November 10, 2024 12:00 AM
            </p>
            <p className="event-card-date end">
              November 13, 2024 12:00 PM
            </p>
          </div>
        </CardContent>
        {true && (
          <CardActions className="event-card-action">
            <IconButton className="event-card-delete">
              <DeleteIcon />
            </IconButton>
          </CardActions>
        )}
      </Card>
    </div>
  );
};

export default EventCard;
