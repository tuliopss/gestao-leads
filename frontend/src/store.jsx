import { configureStore } from "@reduxjs/toolkit";
import leadReducer from "./leads/slices/leads-slice";
import salesPersonReducer from "./salespersons/slices/salesperson-slice";
import consultationReducer from "./customer-services/slices/consultation-slice";
import productReducer from "./products/slices/products-slice";
import messageReducer from "./utils/global-messages-slices";
export const store = configureStore({
  reducer: {
    lead: leadReducer,
    salesPerson: salesPersonReducer,
    consultation: consultationReducer,
    product: productReducer,
    message: messageReducer,
  },
});
