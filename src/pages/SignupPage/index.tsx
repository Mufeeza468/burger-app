import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);

      setTimeout(() => {
        const user = {
          ...values,
          id: Date.now(),
        };
        localStorage.setItem("user", JSON.stringify(user));

        setSubmitting(false);
        resetForm();
        navigate("/login");
      }, 1500);
    },
  });

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "90vh",
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: "url('/images/home.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(8px)",
          zIndex: -1,
        }}
      />

      <Container maxWidth="sm" sx={{ zIndex: 1 }}>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            padding: 3,
            borderRadius: 2,
            boxShadow: 3,
            backgroundColor: "#edf3f5",
          }}
        >
          <Typography variant="h4" align="center" gutterBottom>
            Sign Up
          </Typography>

          <TextField
            label="Name"
            name="name"
            fullWidth
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            sx={{
              "& .MuiInputBase-root": {
                borderRadius: "10px",
                backgroundColor: "#f4f4f4",
              },
            }}
          />

          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            sx={{
              "& .MuiInputBase-root": {
                borderRadius: "10px",
                backgroundColor: "#f4f4f4",
              },
            }}
          />

          <TextField
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            fullWidth
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            sx={{
              "& .MuiInputBase-root": {
                borderRadius: "10px",
                backgroundColor: "#f4f4f4",
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={formik.isSubmitting}
            sx={{
              padding: 1.5,
              borderRadius: "10px",
              textTransform: "none",
              fontSize: "16px",
              backgroundColor: "#703b09",
              color: "#fff",
              "&:hover": { backgroundColor: "#5a2d07" },
              "&.Mui-disabled": {
                backgroundColor: "#703b09",
                color: "#fff",
                opacity: 0.9,
              },
            }}
          >
            {formik.isSubmitting ? "Creating account..." : "Sign Up"}
          </Button>

          <Typography align="center">
            Already have an account?{" "}
            <Button
              onClick={() => navigate("/login")}
              sx={{ textTransform: "none", padding: 0 }}
            >
              Login
            </Button>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default SignupPage;
