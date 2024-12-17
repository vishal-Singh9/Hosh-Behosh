import React from "react";
import { Box, Typography, Grid, Link, IconButton } from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";
import "/styles/Footer.css";
const Footer = () => {
  return (
    <Box className="footer-container">
      <Grid container spacing={4}>
        {/* About Us Section */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6" className="footer-title">
            About Us
          </Typography>
          <Typography variant="body2" className="footer-text">
            We are dedicated to providing the best quality services and products
            to our customers. Our mission is to bring innovation and excellence
            to your experience.
          </Typography>
        </Grid>

        {/* Quick Links Section */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6" className="footer-title">
            Quick Links
          </Typography>
          <Box className="footer-links">
            <Link href="/" className="footer-link">
              Home
            </Link>
            <Link href="/about" className="footer-link">
              About Us
            </Link>
            <Link href="/contact" className="footer-link">
              Contact Us
            </Link>
          </Box>
        </Grid>

        {/* Contact Us Section */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6" className="footer-title">
            Contact Us
          </Typography>
          <Typography variant="body2" className="footer-text">
            431 Innovation Street, DELHI
            <br />
            INDIA, IND 30001
            <br />
            Email: hoshbehosh@gmail.com
            <br />
            Phone: +1 91 234 567 890
          </Typography>

          {/* Social Media Icons */}
          <Box className="footer-social-icons">
            <IconButton href="https://facebook.com">
              <Facebook />
            </IconButton>
            <IconButton href="https://twitter.com">
              <Twitter />
            </IconButton>
            <IconButton href="https://instagram.com">
              <Instagram />
            </IconButton>
            <IconButton href="https://linkedin.com">
              <LinkedIn />
            </IconButton>
          </Box>
        </Grid>
      </Grid>

      {/* Footer Bottom */}
      <Box className="footer-bottom">
        <Typography variant="body2">
          © {new Date().getFullYear()} Your Company. All rights reserved.
          <Link href="/privacy-policy">Privacy Policy</Link> |{" "}
          <Link href="/terms-of-service">Terms of Service</Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
