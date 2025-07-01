import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Divider,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { IngredientType } from "../../utils/ingredientStyles";

interface Order {
  id: string;
  ingredients: Record<IngredientType, number>;
  totalPrice: number;
  orderDate: string;
  userId: string;
}

const OrderList: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("user") || "null");
    const currentUserId = currentUser?.id;

    const storedOrders: Order[] = JSON.parse(
      localStorage.getItem("orders") || "[]"
    );

    const userOrders = storedOrders.filter(
      (order) => order.userId === currentUserId
    );
    setOrders(userOrders);
  }, []);

  const handleDelete = (id: string) => {
    const updatedOrders = orders.filter((order) => order.id !== id);
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: 2,
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: 600,
          }}
        >
          My Orders
        </Typography>
      </Box>

      {orders.length === 0 ? (
        <Typography>No orders found.</Typography>
      ) : (
        orders.map((order) => (
          <Paper
            key={order.id}
            elevation={3}
            sx={{
              mb: 3,
              p: 3,
              borderRadius: 2,
              backgroundColor: "#fff9f5",
              position: "relative",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column-reverse", sm: "row" },
                alignItems: { xs: "flex-center", sm: "center" },
                justifyContent: "space-between",
                mb: 1,
                gap: { xs: 1, sm: 0 },
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ m: 0 }}>
                Ingredients:
              </Typography>

              <Tooltip title="Delete Order">
                <IconButton onClick={() => handleDelete(order.id)} size="small">
                  <DeleteIcon color="error" />
                </IconButton>
              </Tooltip>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
                mb: 2,
              }}
            >
              {Object.entries(order.ingredients).map(
                ([ingredient, count]) =>
                  count > 0 && (
                    <Typography
                      key={ingredient}
                      sx={{
                        border: "1px solid #ddd",
                        borderRadius: "20px",
                        px: 2,
                        py: 0.5,
                        backgroundColor: "#f4e3d7",
                        fontSize: "0.9rem",
                      }}
                    >
                      {ingredient}: {count}
                    </Typography>
                  )
              )}
            </Box>

            <Divider sx={{ my: 2 }} />

            <Typography>
              <strong>Total Price:</strong> ${order.totalPrice.toFixed(2)}
            </Typography>
            <Typography>
              <strong>Order Date:</strong>{" "}
              {new Date(order.orderDate).toLocaleString()}
            </Typography>
          </Paper>
        ))
      )}
    </Box>
  );
};

export default OrderList;
