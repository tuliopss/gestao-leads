import { configureStore } from "@reduxjs/toolkit";
import leadReducer from "./leads/slices/leads-slice";
// import orderReducer from "./orders/slices/orders-slices.ts";

export const store = configureStore({
  reducer: {
    lead: leadReducer,
  },
});
