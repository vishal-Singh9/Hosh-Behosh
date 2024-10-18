import { Button, TextField, Typography, Box } from "@mui/material";
import { Formik, Form, Field } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginUser } from "../../State/Authentication/Action";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = (values) => {
    dispatch(LoginUser({ userData: values, navigate }));
  };

  const handleRegisterClick = () => {
    navigate("/account/register");
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
      <Typography variant="h5" align="center" color="textPrimary" gutterBottom>
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
              variant="outlined"
              margin="normal"
            />
            <Field
              as={TextField}
              name="password"
              label="Password"
              type="password"
              fullWidth
              variant="outlined"
              margin="normal"
            />
            <Button
              sx={{ mt: 2, py: 1 }}
              fullWidth
              type="submit"
              variant="contained"
            >
           Login
            </Button>
          </Form>
        )}
      </Formik>

      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        Don't have an account?{" "}
        <Button onClick={handleRegisterClick}>Register</Button>
      </Typography>
    </Box>
  );
};

export default LoginForm;
