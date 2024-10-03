import { configureStore } from "@reduxjs/toolkit";
import leadReducer from "./leads/slices/leads-slice";
import salesPersonReducer from "./salespersons/slices/salesperson-slice";
import consultationReducer from "./customer-services/slices/consultation-slice";

export const store = configureStore({
  reducer: {
    lead: leadReducer,
    salesPerson: salesPersonReducer,
    consultation: consultationReducer,
  },
});
