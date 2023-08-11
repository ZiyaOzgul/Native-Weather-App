import { configureStore } from "@reduxjs/toolkit";
import forecastReducer from "./forecastSlice/forecastSlice";

export const store = configureStore({
  reducer: {
    forecast: forecastReducer,
  },
});
