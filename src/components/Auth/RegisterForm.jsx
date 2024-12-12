import React from "react";
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
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../State/Authentication/Action";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";


const initialValues = {
  fullName: "",
  role: "ROLE_CUSTOMER",
  email: "",
  password: "",
};

// Yup validation schema
const validationSchema = Yup.object({
  fullName: Yup.string().required("Full Name is required"),
  email: Yup.string().email("Invalid email format").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
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
    <div>
      <Typography variant="h5" align="center" color="textPrimary">
        Register
      </Typography>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {({ errors, touched }) => (
          <Form>
            <Field
              name="fullName"
              as={TextField}
              label="Full Name"
              fullWidth
              variant="outlined"
              margin="normal"
              error={touched.fullName && Boolean(errors.fullName)}
              helperText={touched.fullName && errors.fullName}
            />
            <Field
              name="email"
              as={TextField}
              label="Email"
              fullWidth
              variant="outlined"
              margin="normal"
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            />
            <Field
              name="password"
              as={TextField}
              label="Password"
              type="password"
              fullWidth
              variant="outlined"
              margin="normal"
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Role</InputLabel>
              <Field name="role">
                {({ field }) => (
                  <Select
                    {...field}
                    label="Role"
                    fullWidth
                    error={touched.role && Boolean(errors.role)}
                  >
                    <MenuItem value="ROLE_CUSTOMER">Customer</MenuItem>
                    <MenuItem value="ROLE_RESTAURANT_OWNER">Restaurant Owner</MenuItem>
                  </Select>
                )}
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
        )}
      </Formik>
      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        Already have an account?
        <Button onClick={() => navigate("/account/login")}>Login</Button>
      </Typography>
    </div>
  );
}

export default RegisterForm;
