import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import leadsService from "../services/leads-service";
import { setMessage } from "../../utils/global-messages-slices";
import { useDispatch } from "react-redux";
const initialState = {
  lead: {},
  leads: [],
  loading: false,
  // error: false,
  // success: false,
  // message: null,
};

export const getAllLeads = createAsyncThunk(
  "lead/getAll",
  async (_, thunkAPI) => {
    const data = await leadsService.getAllLeads();

    // if (data.error) {
    //   return thunkAPI.rejectWithValue(data.error.message);
    // }
    return data;
  }
);

export const createLead = createAsyncThunk(
  "lead/create",
  async (lead, thunkAPI) => {
    try {
      const data = await leadsService.createLead(lead);

      if (data.error) {
        thunkAPI.dispatch(
          setMessage({ message: data.message[0], error: true, success: false })
        );
        return thunkAPI.rejectWithValue(data.message[0]);
      }

      // Caso o lead seja criado com sucesso
      thunkAPI.dispatch(
        setMessage({
          message: "Lead registrado com sucesso!",
          error: false,
          success: true,
        })
      );

      return data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Erro ao registrar lead";
      thunkAPI.dispatch(
        setMessage({ message: errorMessage, error: true, success: false })
      );
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);
export const leadSlice = createSlice({
  name: "lead",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = null;
      state.error = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllLeads.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getAllLeads.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.leads = action.payload;
      })
      .addCase(createLead.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.success = false;
      })
      .addCase(createLead.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.lead = action.payload;

        // action.asyncDispatch(
        //   setMessage({ message: "Lead registrado com sucesso!" })
        // );

        // state.message = `Lead registrado com sucesso!`;
      })
      .addCase(createLead.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.success = false;

        state.message = action.payload;

        state.lead = {};
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

export const { resetMessage } = leadSlice.actions;
export default leadSlice.reducer;
