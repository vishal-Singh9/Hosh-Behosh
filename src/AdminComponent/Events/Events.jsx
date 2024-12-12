import { name } from "@cloudinary/url-gen/actions/namedTransformation";
import { Box, Button, Grid, Modal, TextField } from "@mui/material";
import React from "react";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useDispatch, useSelector } from "react-redux";
import CreateEvent from "./CreateEvent";
import { createEventAction } from "../../State/Restaurant/Action";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Events = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const { restaurant } = useSelector((store) => store);
  const token = localStorage.getItem("token");
  const restaurantId = restaurant?.userRestaurants?.restaurantId;
  const [formValues, setFormValues] = React.useState({
    image: "",
    location: "",
    name: "",
    startedAt: "",
    endedAt: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createEventAction({ reqData: formValues, token, restaurantId }));

    setFormValues({
      image: "",
      location: "",
      name: "",
      startedAt: "",
      endedAt: "",
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const handleDateChange = (date, dateType) => {
    const formatedDate = dayjs(date).format("YYYY-MM-DD HH:mm:ss");
    setFormValues({ ...formValues, [dateType]: formatedDate });
  };

  const today = dayjs();

  return (
    <div>
      <div>
        <Button onClick={handleOpen} variant="contained">
          Create an Event
        </Button>
        <div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <form action="" onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      name="image"
                      label="Image URL"
                      variant="outlined"
                      fullWidth
                      value={formValues.image}
                      onChange={handleFormChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="location"
                      label="Location"
                      variant="outlined"
                      value={formValues.location}
                      onChange={handleFormChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="name"
                      label="Name"
                      variant="outlined"
                      value={formValues.name}
                      onChange={handleFormChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoItem label="Start Date Time">
                        <DateTimePicker
                          onChange={(newValue) => {
                            handleDateChange(newValue, "startedAt");
                          }}
                          views={["year", "month", "day", "hours", "minutes"]}
                        />
                      </DemoItem>
                      <DemoItem label="End Date Time">
                        <DateTimePicker
                          onChange={(newValue) => {
                            handleDateChange(newValue, "endedAt");
                          }}
                          views={["year", "month", "day", "hours", "minutes"]}
                        />
                      </DemoItem>
                    </LocalizationProvider>
                    <br />
                    <Button type="submit" variant="contained">
                      Submit
                    </Button>
                  </Grid>
                  <Grid item xs={12}></Grid>
                </Grid>
              </form>
            </Box>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Events;
