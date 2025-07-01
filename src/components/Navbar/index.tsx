import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const navigate = useNavigate();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("token");
    // localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <AppBar
      position="static"
      sx={{ padding: "0.5rem 2rem", backgroundColor: "#703b09" }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box
          sx={{
            display: { xs: "block", sm: "none" },
            order: { xs: 1, sm: 0 },
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleMenuOpen}
            sx={{ fontSize: "2rem" }}
          >
            <MenuIcon fontSize="inherit" />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem
              component={NavLink}
              to="/builder"
              onClick={handleMenuClose}
            >
              Burger Builder
            </MenuItem>
            {isAuthenticated ? (
              <MenuItem
                onClick={() => {
                  handleLogout();
                  handleMenuClose();
                }}
              >
                Logout
              </MenuItem>
            ) : (
              <MenuItem
                component={NavLink}
                to="/login"
                onClick={handleMenuClose}
              >
                Login
              </MenuItem>
            )}
          </Menu>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            order: { xs: 2, sm: 0 },
            marginLeft: { xs: "auto", sm: 0 },
          }}
        >
          <img
            src="/images/logo.png"
            alt="Burger Logo"
            style={{ height: "40px", marginRight: "10px" }}
          />
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: 600,
              display: { xs: "none", sm: "block" },
            }}
          >
            Burger App
          </Typography>
        </Box>

        <Box sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center" }}>
          {/* <NavLink
            to="/builder"
            style={({ isActive }) => ({
              color: "white",
              textDecoration: "none",
              marginRight: "16px",
              padding: "6px 12px",
              borderBottom: isActive ? "2px solid skyblue" : "none",
              backgroundColor: isActive ? "#8f5c2c" : "transparent",
              borderRadius: "6px",
            })}
          >
            Burger Builder
          </NavLink> */}

          {isAuthenticated ? (
            <span
              onClick={handleLogout}
              style={{
                color: "white",
                cursor: "pointer",
                padding: "6px 12px",
                borderRadius: "6px",
                backgroundColor: "#8f5c2c",
              }}
            >
              Logout
            </span>
          ) : (
            <NavLink
              to="/login"
              style={({ isActive }) => ({
                color: "white",
                textDecoration: "none",
                padding: "6px 12px",
                borderBottom: isActive ? "2px solid skyblue" : "none",
                backgroundColor: isActive ? "#8f5c2c" : "transparent",
                borderRadius: "6px",
              })}
            >
              Login
            </NavLink>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
