import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleStartBuilding = () => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: "url('/images/home.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        px: 3,
        position: "relative",
        textAlign: "center",
        color: "#fff",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1,
        },
      }}
    >
      <Box sx={{ zIndex: 2, mt: 10, maxWidth: 700 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Build Your Dream Burger 🍔
        </Typography>
        <Typography variant="body1" paragraph>
          Choose ingredients, customize your taste, and enjoy the best virtual
          burger building experience. Let’s get started!
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={handleStartBuilding}
          sx={{
            backgroundColor: "#703b09",
            "&:hover": { backgroundColor: "#5a2d07" },
            mt: 2,
          }}
        >
          Start Building
        </Button>
      </Box>
    </Box>
  );
};

export default HomePage;
