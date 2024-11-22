import React from "react";
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  Paper,
  IconButton,
} from "@mui/material";
import { LocationOn, Phone, Email, Facebook, Twitter, Instagram } from "@mui/icons-material";
import "/styles/Contact.css";

const Contact = () => {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Form Data:", formData);
    alert("Your message has been sent successfully!");
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <Box>
      {/* Header Section */}
      <Box
        sx={{
          textAlign: "center",
          py: 6,
          backgroundColor: "#f8f9fa",
        }}
      >
        <Typography variant="h3" className="header-text">
          Contact Us
        </Typography>
        <Typography variant="h6" className="sub-header-text">
          Have a question? We’re here to help!
        </Typography>
      </Box>

      {/* Contact Info Section */}
      <Box
        sx={{
          py: 6,
          px: { xs: 3, md: 12 },
        }}
      >
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} className="info-card">
              <LocationOn className="icon" />
              <Typography variant="h6">Our Address</Typography>
              <Typography variant="body1">
                431 Innovation Street, DELHI, INDIA, IND 30001
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} className="info-card">
              <Phone className="icon" />
              <Typography variant="h6">Phone</Typography>
              <Typography variant="body1">+1 91 234 567 890</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} className="info-card">
              <Email className="icon" />
              <Typography variant="h6">Email</Typography>
              <Typography variant="body1">hoshbehosh@gmail.com</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* Contact Form Section */}
      <Box
        sx={{
          py: 6,
          px: { xs: 3, md: 12 },
        }}
      >
        <Typography variant="h4" sx={{ textAlign: "center", mb: 4 }}>
          Send Us a Message
        </Typography>
        <Paper elevation={3} sx={{ padding: { xs: 3, md: 6 } }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Your Name"
                  name="name"
                  variant="outlined"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Your Email"
                  name="email"
                  type="email"
                  variant="outlined"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Subject"
                  name="subject"
                  variant="outlined"
                  value={formData.subject}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Message"
                  name="message"
                  multiline
                  rows={4}
                  variant="outlined"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{
                    padding: "12px",
                    backgroundColor: "#ff7043",
                    "&:hover": { backgroundColor: "#e64a19" },
                  }}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>

      {/* Social Media Section */}
      <Box
        sx={{
          textAlign: "center",
          py: 4,
          backgroundColor: "#f8f9fa",
        }}
      >
        <Typography variant="h5" sx={{ mb: 2 }}>
          Follow Us
        </Typography>
        <Box>
          <IconButton href="#" className="social-icon">
            <Facebook />
          </IconButton>
          <IconButton href="#" className="social-icon">
            <Twitter />
          </IconButton>
          <IconButton href="#" className="social-icon">
            <Instagram />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Contact;
