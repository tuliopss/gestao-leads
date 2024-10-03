import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import salesPersonService from "../services/salesperson-service";

const initialState = {
  salesPerson: {},
  salesPersons: [],
  error: false,
  success: false,
  loading: false,
  message: null,
};

export const getAllSalesPersons = createAsyncThunk(
  "salesPerson/getAll",
  async (_, thunkAPI) => {
    const data = await salesPersonService.getAllSalesPersons();

    if (data.error) {
      return thunkAPI.rejectWithValue(data.error.message);
    }
    return data;
  }
);

// export const getLeadById = createAsyncThunk(
//   "lead/leadById",
//   async (id, thunkAPI) => {
//     const data = await leadService.getUserById(id, token);

//     if (data.error) {
//       return thunkAPI.rejectWithValue(data.error.message);
//     }

//     return data;
//   }
// );

export const registerSalesPerson = createAsyncThunk(
  "salesPerson/register",
  async (salesPerson, thunkAPI) => {
    const data = await salesPersonService.registerSalesPerson(salesPerson);

    if (data.error) {
      return thunkAPI.rejectWithValue(data.message[0]);
    }

    return data;
  }
);

export const salesPersonSlice = createSlice({
  name: "salesPerson",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = null;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllSalesPersons.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.success = false;
      })
      .addCase(getAllSalesPersons.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.salesPersons = action.payload;
      })
      .addCase(registerSalesPerson.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(registerSalesPerson.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.salesPerson = action.payload;
        state.message = `Atendente registrado com sucesso!`;
      })
      .addCase(registerSalesPerson.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.success = false;

        state.message = action.payload;

        state.salesPerson = {};
      });
    //   .addCase(getUserById.pending, (state) => {
    //     state.loading = true;
    //     state.error = false;
    //   })
    //   .addCase(getUserById.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.success = true;
    //     state.error = null;
    //     state.user = action.payload;
    //   });
  },
});

export const { resetMessage } = salesPersonSlice.actions;
export default salesPersonSlice.reducer;
