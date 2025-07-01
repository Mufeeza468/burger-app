import {
  Box,
  Button,
  Modal,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux";
import { addIngredient, removeIngredient } from "../../redux/slice/burgerSlice";
import { getIngredientStyle, INGREDIENTS } from "../../utils/ingredientStyles";
import { useState } from "react";
import CheckoutForm from "../CheckoutForm";

const PlaceOrder: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const { ingredients, totalPrice } = useSelector(
    (state: RootState) => state.burger
  );

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [openFormModal, setOpenFormModal] = useState(false);

  const renderBurgerLayers = () => {
    const layers = [];
    for (const ingredient of INGREDIENTS) {
      const count = ingredients[ingredient];
      for (let i = 0; i < count; i++) {
        layers.push(
          <div
            key={`${ingredient}-${i}`}
            style={getIngredientStyle(ingredient, isMobile)}
          />
        );
      }
    }
    return layers;
  };

  return (
    <Box
      sx={{
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Place Your Order
      </Typography>

      <Box
        sx={{
          border: "2px solid #ccc",
          borderRadius: "12px",
          padding: "1rem",
          margin: "1rem auto",
          width: isMobile ? "160px" : "300px",
          backgroundColor: "#fff9f5",
        }}
      >
        <div
          style={{
            position: "relative",
            backgroundColor: "#8f5014",
            height: "80px",
            width: isMobile ? "80%" : "100%",
            borderTopLeftRadius: "50% 100%",
            borderTopRightRadius: "50% 100%",
            margin: "4px auto",
            boxShadow: "inset 0 -4px #c97b33",
            overflow: "hidden",
          }}
        >
          {[
            { top: 18, leftPercent: 2 },
            { top: 16, leftPercent: 20 },
            { top: 14, leftPercent: 40 },
            { top: 16, leftPercent: 60 },
            { top: 18, leftPercent: 78 },
            { top: 18, leftPercent: 96 },

            { top: 30, leftPercent: 5 },
            { top: 28, leftPercent: 25 },
            { top: 26, leftPercent: 50 },
            { top: 28, leftPercent: 75 },
            { top: 30, leftPercent: 95 },

            { top: 42, leftPercent: 10 },
            { top: 40, leftPercent: 35 },
            { top: 42, leftPercent: 65 },
            { top: 40, leftPercent: 90 },
          ].map((seed, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                top: seed.top,
                left: `${seed.leftPercent}%`,
                width: "8px",
                height: "5px",
                backgroundColor: "#fbe8d0",
                borderRadius: "50%",
                transform: `rotate(${i * 17}deg)`,
                boxShadow: "0 0 1px #d6b48c",
              }}
            />
          ))}
        </div>

        {Object.values(ingredients).every((count) => count === 0) ? (
          <Typography sx={{ fontSize: "0.85rem", color: "#555", mt: 1 }}>
            No Ingredients Added
          </Typography>
        ) : (
          renderBurgerLayers()
        )}

        <div
          style={{
            backgroundColor: "#8f5014",
            height: "60px",
            width: isMobile ? "80%" : "100%",
            borderBottomLeftRadius: " 40%",
            borderBottomRightRadius: "40%",
            margin: "4px auto",
            boxShadow: "inset 0 4px #c97b33",
          }}
        />
      </Box>

      <Typography variant="h6">
        Current Price: ${totalPrice.toFixed(2)}
      </Typography>

      <Box sx={{ mt: 3 }}>
        {INGREDIENTS.map((ingredient) => (
          <Box
            key={ingredient}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
              marginBottom: 1,
            }}
          >
            <Typography sx={{ width: "100px", textTransform: "capitalize" }}>
              {ingredient}
            </Typography>
            <Button
              variant="outlined"
              onClick={() => dispatch(removeIngredient(ingredient))}
            >
              -
            </Button>
            <Typography>{ingredients[ingredient]}</Typography>
            <Button
              variant="outlined"
              onClick={() => dispatch(addIngredient(ingredient))}
            >
              +
            </Button>
          </Box>
        ))}
      </Box>

      <Button
        variant="contained"
        color="primary"
        sx={{
          mt: 4,
          backgroundColor: "#703b09",
          "&:hover": { backgroundColor: "#5a2d07" },
        }}
        onClick={() => setOpenModal(true)}
        disabled={Object.values(ingredients).every((count) => count === 0)}
      >
        Order Now
      </Button>

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Paper
          sx={{
            width: {
              xs: "90%",
              sm: 400,
            },
            maxWidth: "95vw",
            margin: "100px auto",
            padding: {
              xs: 2,
              sm: 4,
            },
            borderRadius: 3,
            textAlign: "center",
          }}
        >
          <Typography variant="h5" gutterBottom>
            Your Order Summary:
          </Typography>

          {INGREDIENTS.map((ingredient) => (
            <Typography key={ingredient}>
              {ingredient}: {ingredients[ingredient]}
            </Typography>
          ))}

          <Typography variant="h6" sx={{ mt: 2 }}>
            Total Price: ${totalPrice.toFixed(2)}
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              gap: 2,
              mt: 4,
            }}
          >
            <Button
              variant="outlined"
              color="error"
              onClick={() => setOpenModal(false)}
              fullWidth
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="success"
              fullWidth
              onClick={() => {
                setOpenModal(false);
                setOpenFormModal(true);
              }}
            >
              Continue
            </Button>
          </Box>
        </Paper>
      </Modal>

      <CheckoutForm
        open={openFormModal}
        onClose={() => setOpenFormModal(false)}
        ingredients={ingredients}
        totalPrice={totalPrice}
      />
    </Box>
  );
};

export default PlaceOrder;
