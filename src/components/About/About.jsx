import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import "/styles/About.css";

const images = [
  "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
  "https://cdn.pixabay.com/photo/2024/06/22/22/56/man-8847069_1280.jpg",
  "https://www.corporateservices.com/wp-content/uploads/O_Weiss_Small.jpg",
  "https://usponsorme.com/wp-content/uploads/2018/08/alicia-salvadori.jpeg",
];
const About = () => {
  return (
    <Box>
      {/* Header Section */}
      <Box
        sx={{
          backgroundColor: "#f8f9fa",
          padding: { xs: 4, md: 8 },
          textAlign: "center",
        }}
      >
        <Typography variant="h3" className="header-text text-red-500">
          Welcome to Hosh Behosh
        </Typography>
        <Typography variant="h6" className="sub-header-text">
          Delivering happiness to your doorstep. Learn more about us and our
          journey!
        </Typography>
        <Button className="button-3d">Explore Our Services</Button>
      </Box>

      {/* Mission, Vision, Values Section */}
      <Box sx={{ py: 8, px: { xs: 3, md: 12 } }}>
        <Grid container spacing={4}>
          {["Our Mission", "Our Vision", "Our Values"].map((title, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card className="card-3d">
                <CardContent>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: "bold", mb: 2, color: "#333" }}
                  >
                    {title}
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#555" }}>
                    {`Description of ${title.toLowerCase()} goes here. Highlight its importance.`}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Team Section */}
      <Box sx={{ py: 8, px: { xs: 3, md: 12 } }}>
        <Typography variant="h4" className="header-text">
          Meet Our Team
        </Typography>
        <Grid container spacing={4}>
          {images.map((item, index) => (
            <Grid item xs={12} md={3} key={index}>
              <Box className="team-card">
                <Box className="team-photo">
                  <img src={item} alt={`Team Member ${index + 1}`} />
                </Box>
                <Typography variant="h6" className="team-name">
                  Team Member {index + 1}
                </Typography>
               
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default About;
