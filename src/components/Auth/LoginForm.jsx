import { Button, TextField, Typography } from "@mui/material";
import { Formik, Form, Field } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginUser } from "../../State/Authentication/Action";

const initialValues = {
  email: "",
  password: "",
};

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    dispatch(LoginUser({ userData: values, navigate }));
  };

  return (
    <div>
      <Typography variant="h5" className="text-center text-black top-0">
        Login
      </Typography>
      <Formik onSubmit={handleSubmit} initialValues={initialValues}>
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
            sx={{ mt: 2, padding: "0.5rem" }}
            fullWidth
            type="submit"
            variant="contained"
          >
            Submit
          </Button>
        </Form>
      </Formik>

      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        Don't have an account?
        <Button
          onClick={() => {
            navigate("/account/register");
          }}
        >
          Register
        </Button>
      </Typography>
    </div>
  );
}

export default LoginForm;
