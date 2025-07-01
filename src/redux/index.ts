import { configureStore } from "@reduxjs/toolkit";
import burgerReducer from "./slice/burgerSlice"

export const store= configureStore({
    reducer:{
        burger:burgerReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch