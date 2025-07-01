import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BurgerState {
  ingredients: {
    lettuce: number;
    bacon: number;
    cheese: number;
    meat: number;
  };
  totalPrice: number;
}

const INGREDIENT_PRICES: { [key: string]: number } = {
  lettuce: 0.5,
  bacon: 0.7,
  cheese: 0.4,
  meat: 0.3,
};

const initialState: BurgerState = {
  ingredients: {
    lettuce: 0,
    bacon: 0,
    cheese: 0,
    meat: 0,
  },
  totalPrice: 0,
};

const burgerSlice = createSlice({
  name: "burger",
  initialState,
  reducers: {
    addIngredient: (
      state,
      action: PayloadAction<keyof BurgerState["ingredients"]>
    ) => {
      const ingredient = action.payload;
      state.ingredients[ingredient]++;
      state.totalPrice += INGREDIENT_PRICES[ingredient];
    },
    removeIngredient: (
      state,
      action: PayloadAction<keyof BurgerState["ingredients"]>
    ) => {
      const ingredient = action.payload;
      if (state.ingredients[ingredient] > 0) {
        state.ingredients[ingredient]--;
        state.totalPrice -= INGREDIENT_PRICES[ingredient];
      }
    },
    resetBurger: () => initialState,
  },
});

export const { addIngredient, removeIngredient, resetBurger } =
  burgerSlice.actions;
export default burgerSlice.reducer;
