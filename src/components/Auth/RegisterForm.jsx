import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../State/Authentication/Action";
import { useDispatch } from "react-redux";

const initialValues = {
  fullName: "",
  role: "ROLE_CUSTOMER",
  email: "",
  password: "",
};

function RegisterForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    console.log("Form submitted", values);
    dispatch(registerUser({ userData: values, navigate }));
  };
  return (
    <div>
      <Typography variant="h5" className="text-center text-black top-0">
        Register
      </Typography>
      <Formik onSubmit={handleSubmit} initialValues={initialValues}>
        <Form>
          <Field
            as={TextField}
            name="fullName"
            label="Full Name"
            fullWidth
            variant="outlined"
            margin="normal"
          />

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

          <FormControl fullWidth margin="normal">
            <InputLabel id="demo-simple-select-label">Role</InputLabel>
            <Field
              as={Select}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Role"
              name="role"
            >
              <MenuItem value={"ROLE_CUSTOMER"}>Customer</MenuItem>
              <MenuItem value={"ROLE_RESTAURANT_OWNER"}>
                Restaurant Owner
              </MenuItem>
            </Field>
          </FormControl>
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
        If have an account?
        <Button
          onClick={() => {
            navigate("/account/login");
          }}
        >
          Login
        </Button>
      </Typography>
    </div>
  );
}

export default RegisterForm;
