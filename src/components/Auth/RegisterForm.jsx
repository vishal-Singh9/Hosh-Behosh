import React from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../State/Authentication/Action";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { motion } from "framer-motion"; // Adding Framer Motion for animations


// Initial Values
const initialValues = {
  fullName: "",
  role: "ROLE_CUSTOMER",
  email: "",
  password: "",
};

// Yup validation schema
const validationSchema = Yup.object({
  fullName: Yup.string().required("Full Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  role: Yup.string().required("Role is required"),
});

function RegisterForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    try {
      await dispatch(registerUser({ userData: values, navigate }));
      toast.success("Registration successful!");
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
        color: "#fff",
      }}
    >
      <Paper
        elevation={10}
        sx={{
          maxWidth: 450,
          width: "100%",
          padding: "2.5rem",
          borderRadius: "1rem",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          color: "#fff",
          boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.2)",
        }}
      >
         <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        ></motion.div>
        {/* Form Title */}
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#fff" }}
        >
          Register
        </Typography>

        {/* Formik Form */}
        <Formik
          onSubmit={handleSubmit}
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          {({ errors, touched }) => (
            <Form>
              {/* Full Name Field */}
              <Field
                name="fullName"
                as={TextField}
                label="Full Name"
                fullWidth
                variant="filled"
                margin="dense"
                error={touched.fullName && Boolean(errors.fullName)}
                helperText={touched.fullName && errors.fullName}
                InputProps={{
                  style: {
                    color: "black",
                    borderRadius: "8px",
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                  },
                }}
                InputLabelProps={{ style: { color: "black" } }}
              />

              {/* Email Field */}
              <Field
                name="email"
                as={TextField}
                label="Email"
                fullWidth
                variant="filled"
                margin="dense"
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                InputProps={{
                  style: {
                    color: "black",
                    borderRadius: "8px",
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                  },
                }}
                InputLabelProps={{ style: { color: "black" } }}
                sx={{ marginBottom: "1rem" }}
              />

              {/* Password Field */}
              <Field
                name="password"
                as={TextField}
                label="Password"
                type="password"
                fullWidth
                variant="filled"
                margin="dense"
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                InputProps={{
                  style: {
                    color: "black",
                    borderRadius: "8px",
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                  },
                }}
                InputLabelProps={{ style: { color: "black" } }}
                sx={{ marginBottom: "1rem" }}
              />

              {/* Role Selection */}
              <FormControl fullWidth margin="dense" sx={{ marginBottom: "1.5rem" }}>
                <InputLabel sx={{ color: "#fff" }}>Role</InputLabel>
                <Field name="role">
                  {({ field }) => (
                    <Select
                      {...field}
                      variant="filled"
                      label="Role"
                      sx={{
                        color: "#fff",
                        backgroundColor: "rgba(255, 255, 255, 0.2)",
                        borderRadius: "8px",
                        ".MuiSelect-icon": { color: "#fff" },
                      }}
                      error={touched.role && Boolean(errors.role)}
                    >
                      <MenuItem value="ROLE_CUSTOMER">Customer</MenuItem>
                      <MenuItem value="ROLE_RESTAURANT_OWNER">
                        Restaurant Owner
                      </MenuItem>
                    </Select>
                  )}
                </Field>
              </FormControl>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  background: "linear-gradient(to right, #56ab2f, #a8e063)",
                  color: "white",
                  fontWeight: "bold",
                  padding: "0.75rem",
                  borderRadius: "0.5rem",
                  "&:hover": {
                    background: "linear-gradient(to right, #a8e063, #56ab2f)",
                  },
                }}
              >
                Register
              </Button>
            </Form>
          )}
        </Formik>

        {/* Already have an account */}
        <Typography
          variant="body2"
          align="center"
          sx={{ marginTop: "1.5rem", color: "#fff" }}
        >
          Already have an account?{" "}
          <Button
            onClick={() => navigate("/account/login")}
            sx={{
              textTransform: "none",
              fontWeight: "bold",
              color: "#a8e063",
              "&:hover": { color: "#56ab2f" },
            }}
          >
            Login
          </Button>
        </Typography>
      </Paper>
    </Box>
  );
}

export default RegisterForm;
