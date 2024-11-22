import React from "react";
import { Box, Typography, Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom";

const ConfirmationPage = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "linear-gradient(to right, #e0f7fa, #ffffff)",
      }}
    >
      <CheckCircleIcon
        sx={{
          fontSize: "100px",
          color: "green",
          mb: 2,
        }}
      />
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          color: "#333",
          textAlign: "center",
          mb: 2,
        }}
      >
        Order Placed Successfully!
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: "#666",
          textAlign: "center",
          mb: 4,
        }}
      >
        Thank you for your order. We'll deliver it to your address soon.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={handleBackToHome}
        sx={{
          fontWeight: "bold",
        }}
      >
        Back to Home
      </Button>
    </Box>
  );
};

export default ConfirmationPage;
