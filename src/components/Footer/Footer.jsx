import React from "react";
import { Box, Typography, Grid, Link, IconButton } from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#1a1a1a",
        color: "#fff",
        py: 6,
        px: { xs: 3, sm: 6, md: 12 },
      }}
    >
      <Grid container spacing={4}>
        {/* About Us Section */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            About Us
          </Typography>
          <Typography variant="body2" sx={{ lineHeight: 1.8 }}>
            We are dedicated to providing the best quality services and products
            to our customers. Our mission is to bring innovation and excellence
            to your experience.
          </Typography>
        </Grid>

        {/* Quick Links Section */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            Quick Links
          </Typography>
          <Box>
            <Link href="/" underline="none" sx={{ color: "#fff", display: "block", mb: 1 }}>
              Home
            </Link>
            <Link href="/about" underline="none" sx={{ color: "#fff", display: "block", mb: 1 }}>
              About Us
            </Link>
           
            <Link href="/contact" underline="none" sx={{ color: "#fff", display: "block", mb: 1 }}>
              Contact Us
            </Link>
          </Box>
        </Grid>

        {/* Contact Us Section */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            Contact Us
          </Typography>
          <Typography variant="body2" sx={{ lineHeight: 1.8, mb: 2 }}>
            431 Innovation Street, DELHI
            <br />
            INDIA, IND 30001
            <br />
            Email:hoshbehosh@gmail.com
            <br />
            Phone: +1 91 234 567 890
          </Typography>

          {/* Social Media Icons */}
          <Box>
            <IconButton sx={{ color: "#fff", mr: 1 }} href="https://facebook.com">
              <Facebook />
            </IconButton>
            <IconButton sx={{ color: "#fff", mr: 1 }} href="https://twitter.com">
              <Twitter />
            </IconButton>
            <IconButton sx={{ color: "#fff", mr: 1 }} href="https://instagram.com">
              <Instagram />
            </IconButton>
            <IconButton sx={{ color: "#fff" }} href="https://linkedin.com">
              <LinkedIn />
            </IconButton>
          </Box>
        </Grid>
      </Grid>

      {/* Footer Bottom */}
      <Box
        sx={{
          borderTop: "1px solid #444",
          mt: 4,
          pt: 3,
          textAlign: "center",
        }}
      >
        <Typography variant="body2">
          © {new Date().getFullYear()} Your Company. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
