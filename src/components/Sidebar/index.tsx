import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  Tooltip,
} from "@mui/material";
import React from "react";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import { useTheme } from "@mui/material/styles";

interface SidebarProps {
  onSelect: (view: string) => void;
  selected: string;
}

const Sidebar: React.FC<SidebarProps> = ({ onSelect, selected }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const options = [
    { label: "Orders", icon: <ReceiptLongIcon /> },
    { label: "PlaceOrders", icon: <RestaurantMenuIcon /> },
  ];

  return (
    <Box
      sx={{
        width: isSmallScreen ? "60px" : "240px",
        backgroundColor: "#fff7f0",
        paddingY: 4,
        borderRight: "2px solid #e0c7b0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        boxShadow: "2px 0 5px rgba(0,0,0,0.05)",
        transition: "width 0.3s",
      }}
    >
      <List sx={{ width: "100%" }}>
        {options.map(({ label, icon }) => (
          <ListItem key={label} disablePadding>
            <Tooltip title={isSmallScreen ? label : ""} placement="right">
              <ListItemButton
                selected={selected === label}
                onClick={() => onSelect(label)}
                sx={{
                  paddingY: 1.5,
                  paddingX: isSmallScreen ? 1 : 3,
                  borderRadius: 0,
                  justifyContent: isSmallScreen ? "center" : "flex-start",
                  "&.Mui-selected": {
                    backgroundColor: "#703b09",
                    color: "white",
                    "& .MuiListItemText-primary": {
                      fontWeight: 600,
                      color: "white",
                    },
                    "&:hover": {
                      backgroundColor: "#8f5c2c",
                    },
                  },
                  "&:hover": {
                    backgroundColor: "#bf9167",
                  },
                }}
              >
                {icon}
                {!isSmallScreen && (
                  <ListItemText
                    primary={label}
                    primaryTypographyProps={{ fontSize: 16 }}
                    sx={{ marginLeft: 2 }}
                  />
                )}
              </ListItemButton>
            </Tooltip>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
