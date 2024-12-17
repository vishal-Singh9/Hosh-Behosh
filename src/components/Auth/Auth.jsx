import { Box, Modal } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import ForgetPassword from "./ForgetPassword";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: "auto",
  outline: "none",
  boxShadow: 24,
  backgroundColor: "white",
  padding: 20,
  border: "1px solid #ccc",
  borderRadius: 10,
};

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleOnClose = () => {
    navigate("/");
  };

  return (
    <Modal
      open={
        ["/account/register", "/account/login", "/account/forgot-password"].includes(location.pathname)
      }
      onClose={handleOnClose}
    >
      <Box style={style}>
        {location.pathname === "/account/register" && <RegisterForm />}
        {location.pathname === "/account/login" && <LoginForm />}
        {location.pathname === "/account/forgot-password" && <ForgetPassword />}
      </Box>
    </Modal>
  );
};

export default Auth;
