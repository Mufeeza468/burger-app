import { Box } from "@mui/material";
import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import PlaceOrder from "../../components/PlaceOrder";
import OrderList from "../../components/OrdersList";

const Dashboard: React.FC = () => {
  const [selectedView, setSelectedView] = useState("PlaceOrders");

  const renderContent = () => {
    switch (selectedView) {
      case "Orders":
        return <OrderList />;
      case "PlaceOrders":
        return <PlaceOrder />;
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      <Sidebar onSelect={setSelectedView} selected={selectedView} />

      <Box
        component="main"
        sx={{
          flex: 1,
          padding: 3,
          overflow: "auto",
          maxWidth: "100vw",
        }}
      >
        {renderContent()}
      </Box>
    </Box>
  );
};

export default Dashboard;
