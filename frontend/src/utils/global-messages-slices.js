import { createSlice } from "@reduxjs/toolkit";
const messageSlice = createSlice({
  name: "message",
  initialState: {
    message: null,
    error: false,
    success: false,
  },
  reducers: {
    resetMessage: (state) => {
      state.message = null;
      state.error = false;
      state.success = false;
    },
    setMessage: (state, action) => {
      state.message = action.payload.message || "";
      state.error = action.payload.error || false;
      state.success = action.payload.success || false;
    },
  },
});

export const { resetMessage, setMessage } = messageSlice.actions;
export default messageSlice.reducer;
