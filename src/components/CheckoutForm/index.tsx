import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
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
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      street: "",
      zipCode: "",
      country: "",
      deliveryMethod: "fastest",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      street: Yup.string().required("Street is required"),
      zipCode: Yup.string()
        .matches(/^\d{5}$/, "Zip Code must be exactly 5 digits")
        .required("Zip Code is required"),
      country: Yup.string().required("Country is required"),
      deliveryMethod: Yup.string().required("Delivery method is required"),
    }),
    onSubmit: (values) => {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const newOrder = {
        id: Date.now().toString(),
        userId: user.id,
        ingredients,
        totalPrice,
        customer: values,
        orderDate: new Date().toISOString(),
      };

      const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
      existingOrders.push(newOrder);
      localStorage.setItem("orders", JSON.stringify(existingOrders));

      toast.success("Order placed successfully!");
      onClose();
    },
  });

  const user = localStorage.getItem("user");

  useEffect(() => {
    if (user) {
      const { name, email } = JSON.parse(user);
      formik.setValues((prev) => ({
        ...prev,
        name,
        email,
      }));
    }
  }, [formik, user]);

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

        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && !!formik.errors.name}
            helperText={formik.touched.name && formik.errors.name}
            fullWidth
          />

          <TextField
            label="Email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && !!formik.errors.email}
            helperText={formik.touched.email && formik.errors.email}
            fullWidth
          />

          <TextField
            label="Street"
            name="street"
            value={formik.values.street}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.street && !!formik.errors.street}
            helperText={formik.touched.street && formik.errors.street}
            fullWidth
          />

          <TextField
            label="Zip Code"
            name="zipCode"
            value={formik.values.zipCode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.zipCode && !!formik.errors.zipCode}
            helperText={formik.touched.zipCode && formik.errors.zipCode}
            fullWidth
          />

          <TextField
            label="Country"
            name="country"
            value={formik.values.country}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.country && !!formik.errors.country}
            helperText={formik.touched.country && formik.errors.country}
            fullWidth
          />

          <FormControl
            fullWidth
            error={
              formik.touched.deliveryMethod && !!formik.errors.deliveryMethod
            }
          >
            <InputLabel>Delivery Method</InputLabel>
            <Select
              name="deliveryMethod"
              value={formik.values.deliveryMethod}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label="Delivery Method"
            >
              <MenuItem value="fastest">Fastest</MenuItem>
              <MenuItem value="cheapest">Cheapest</MenuItem>
            </Select>
          </FormControl>

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
            Order
          </Button>
        </Box>
      </Paper>
    </Modal>
  );
};

export default CheckoutForm;
