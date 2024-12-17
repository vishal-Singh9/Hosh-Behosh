import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  sendOtp,
  verifyOtp,
  updatePassword,
} from "../../State/Authentication/Action";

const ForgetPassword = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [context, setContext] = useState(""); // Default context
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  // Handle "Send OTP"
  const handleRequestReset = async () => {
    if (!email) {
      toast.error("Please enter a valid email.");
      return;
    }
    try {
      const response = await dispatch(sendOtp(email));
      toast.success(response?.message || "OTP sent to your email.");
      setStep(2);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to send OTP. Please try again."
      );
    }
  };

  // Handle "Verify OTP"
  const handleVerifyOtp = async () => {
    if (!otp) {
      toast.error("Please enter the OTP.");
      return;
    }
    try {
      const response = await dispatch(verifyOtp(email, otp));
      toast.success(response?.message || "OTP verified successfully.");
      setStep(3); // Move to the "Update Password" step
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Invalid OTP. Please try again."
      );
    }
  };

  // Handle "Update Password"
  const handleUpdatePassword = async () => {
    if (!context) {
      toast.error("Please select a context.");
      return;
    }

    if (
      context === "UPDATE" &&
      (!currentPassword || !newPassword || !repeatPassword)
    ) {
      toast.error("All fields are required in the UPDATE context.");
      return;
    }

    if (context === "FORGET" && (!newPassword || !repeatPassword)) {
      toast.error("New password fields cannot be empty.");
      return;
    }

    if (newPassword !== repeatPassword) {
      toast.error("New Password and Repeat Password do not match.");
      return;
    }

    try {
      const response = await dispatch(
        updatePassword(email, context, {
          currentPassword,
          newPassword,
          repeatPassword,
        })
      );
      toast.success(response?.message || "Password updated successfully!");
      setTimeout(() => (window.location.href = "/account/login"), 2000);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update password. Please try again."
      );
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Forgot Password
      </Typography>

      {/* Step 1: Request OTP */}
      {step === 1 && (
        <>
          <TextField
            fullWidth
            variant="outlined"
            label="Email"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            fullWidth
            variant="contained"
            onClick={handleRequestReset}
            sx={{ mt: 2 }}
          >
            Send OTP
          </Button>
        </>
      )}

      {/* Step 2: Verify OTP */}
      {step === 2 && (
        <>
          <TextField
            fullWidth
            variant="outlined"
            label="OTP"
            margin="normal"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <Button
            fullWidth
            variant="contained"
            onClick={handleVerifyOtp}
            sx={{ mt: 2 }}
          >
            Verify OTP
          </Button>
        </>
      )}

      {/* Step 3: Update Password */}
      {step === 3 && (
        <>
          <FormControl fullWidth margin="normal">
            <InputLabel id="context-label">Select Context</InputLabel>
            <Select
              labelId="context-label"
              value={context}
              onChange={(e) => setContext(e.target.value)}
              variant="outlined"
            >
              <MenuItem value="UPDATE">UPDATE</MenuItem>
              <MenuItem value="FORGET">FORGET</MenuItem>
            </Select>
          </FormControl>

          {/* Conditional Fields Based on Context */}
          {context === "UPDATE" && (
            <>
              <TextField
                fullWidth
                variant="outlined"
                label="Current Password"
                margin="normal"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              <TextField
                fullWidth
                variant="outlined"
                label="New Password"
                margin="normal"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <TextField
                fullWidth
                variant="outlined"
                label="Repeat Password"
                margin="normal"
                type="password"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
              />
            </>
          )}

          {context === "FORGET" && (
            <>
              <TextField
                fullWidth
                variant="outlined"
                label="New Password"
                margin="normal"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <TextField
                fullWidth
                variant="outlined"
                label="Repeat Password"
                margin="normal"
                type="password"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
              />
            </>
          )}

          <Button
            fullWidth
            variant="contained"
            onClick={handleUpdatePassword}
            sx={{ mt: 2 }}
          >
            Update Password
          </Button>
        </>
      )}
    </Box>
  );
};

export default ForgetPassword;
