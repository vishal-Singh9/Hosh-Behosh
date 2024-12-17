import React from "react";
import { Button, TextField, Typography, Box, Paper } from "@mui/material";
import { Formik, Form, Field } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginUser } from "../../State/Authentication/Action";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion"; // Adding Framer Motion for animations

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = (values) => {
    dispatch(LoginUser({ userData: values, navigate }))
      .then((response) => {
        if (response.payload && response.payload.success) {
          toast.success("Login successful!", {
            position: "top-left",
            autoClose: 1000,
          });
        } else {
          toast.error("Incorrect password. Please try again.", {
            position: "top-left",
            autoClose: 1000,
          });
        }
      })
      .catch(() => {
        toast.error("Login failed. Please Register!!.", {
          position: "top-left",
          autoClose: 1000,
        });
      });
  };

  return (
    <>
      <ToastContainer />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
          color: "#fff",
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Paper
            elevation={10}
            sx={{
              p: 4,
              maxWidth: 400,
              borderRadius: 4,
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)",
              color: "#fff",
              boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.2)",
            }}
          >
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              sx={{ fontWeight: "bold", color: "#fff" }}
            >
              Login
            </Typography>

            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
              {() => (
                <Form>
                  <Field
                    as={TextField}
                    name="email"
                    label="Email"
                    fullWidth
                    variant="filled"
                    margin="normal"
                    InputProps={{
                      style: {
                        color: "black",
                        borderRadius: "8px",
                        backgroundColor: "rgba(255, 255, 255, 0.2)",
                      },
                    }}
                    InputLabelProps={{ style: { color: "black" } }}
                  />
                  <Field
                    as={TextField}
                    name="password"
                    label="Password"
                    type="password"
                    fullWidth
                    variant="filled"
                    margin="normal"
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
                  <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    sx={{
                      mt: 3,
                      py: 1.5,
                      fontWeight: "bold",
                      borderRadius: 8,
                      background: "linear-gradient(to right, #56ab2f, #a8e063)",
                      "&:hover": {
                        background:
                          "linear-gradient(to right, #a8e063, #56ab2f)",
                      },
                    }}
                  >
                    Login
                  </Button>
                </Form>
              )}
            </Formik>

            <Box sx={{ textAlign: "center", mt: 2 }}>
              <Typography variant="body2" sx={{ color: "#fff" }}>
                Don't have an account?{" "}
                <Button
                  onClick={() => navigate("/account/register")}
                  sx={{
                    textTransform: "none",
                    color: "#a8e063",
                    fontWeight: "bold",
                  }}
                >
                  Register
                </Button>
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, color: "#fff" }}>
                <Button
                  onClick={() => navigate("/account/forgot-password")}
                  sx={{
                    textTransform: "none",
                    color: "#56ab2f",
                    fontWeight: "bold",
                  }}
                >
                  Forgot Password?
                </Button>
              </Typography>
            </Box>
          </Paper>
        </motion.div>
      </Box>
    </>
  );
};

export default LoginForm;
