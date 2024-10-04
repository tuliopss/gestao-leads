import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productsService from "../services/products-service";
const initialState = {
  product: {},
  products: [],
  error: false,
  success: false,
  loading: false,
  message: null,
};

export const getAllProducts = createAsyncThunk(
  "product/getAll",
  async (_, thunkAPI) => {
    const data = await productsService.getAllProducts();

    // if (data.error) {
    //   return thunkAPI.rejectWithValue(data.error.message);
    // }
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

// export const updateProfile = createAsyncThunk(
//   "user/update",
//   async (user, thunkAPI) => {
//     const token = thunkAPI.getState().auth.user.token;
//     const data = await userService.updateProfile(user, token);

//     if (data.errors) {
//       return thunkAPI.rejectWithValue(data.errors[0]);
//     }

//     return data;
//   }
// );

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.products = action.payload;
      });
    //   .addCase(updateProfile.pending, (state) => {
    //     state.loading = true;
    //     state.error = false;
    //   })
    //   .addCase(updateProfile.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.success = true;
    //     state.error = null;
    //     state.user = action.payload;
    //     state.message = `Usuário atualizado com sucesso!`;
    //   })
    //   .addCase(updateProfile.rejected, (state, action) => {
    //     console.log(state, action);
    //     state.loading = false;
    //     state.error = action.payload;
    //     state.user = {};
    //   })
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

export const { resetMessage } = productSlice.actions;
export default productSlice.reducer;
