import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { IngredientType } from "../../utils/ingredientStyles";
import { toast } from "react-toastify";

interface CheckoutFormProps {
  open: boolean;
  onClose: () => void;
  ingredients: Record<IngredientType, number>;
  totalPrice: number;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
  open,
  onClose,
  ingredients,
  totalPrice,
}) => {
  const [orderForm, setOrderForm] = useState({
    name: "",
    email: "",
    street: "",
    zipCode: "",
    country: "",
    deliveryMethod: "fastest",
  });

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const { name, email, id } = JSON.parse(user);
      setOrderForm((prev) => ({ ...prev, name, email, id }));
    }
  }, []);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent
  ) => {
    const { name, value } = e.target;
    setOrderForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const saveOrderToLocalStorage = () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const newOrder = {
      userId: user.id,
      ingredients,
      totalPrice,
      customer: orderForm,
      orderDate: new Date().toISOString(),
    };

    const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    existingOrders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(existingOrders));
  };

  const handleSubmit = () => {
    saveOrderToLocalStorage();
    onClose();
    toast.success("Order placed successfully!");
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Paper
        sx={{
          width: { xs: "90%", sm: 400 },
          margin: "100px auto",
          padding: 4,
          borderRadius: 3,
          textAlign: "center",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Enter Your Data
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Name"
            name="name"
            value={orderForm.name}
            fullWidth
            onChange={handleChange}
          />
          <TextField
            label="Email"
            name="email"
            value={orderForm.email}
            fullWidth
            onChange={handleChange}
          />
          <TextField
            label="Street"
            name="street"
            fullWidth
            value={orderForm.street}
            onChange={handleChange}
          />
          <TextField
            label="Zip Code"
            name="zipCode"
            fullWidth
            value={orderForm.zipCode}
            onChange={handleChange}
          />
          <TextField
            label="Country"
            name="country"
            fullWidth
            value={orderForm.country}
            onChange={handleChange}
          />
          <FormControl fullWidth>
            <InputLabel>Delivery Method</InputLabel>
            <Select
              name="deliveryMethod"
              value={orderForm.deliveryMethod}
              onChange={handleChange}
              label="Delivery Method"
            >
              <MenuItem value="fastest">Fastest</MenuItem>
              <MenuItem value="cheapest">Cheapest</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Button
          fullWidth
          sx={{ mt: 3 }}
          variant="contained"
          onClick={handleSubmit}
        >
          Order
        </Button>
      </Paper>
    </Modal>
  );
};

export default CheckoutForm;
