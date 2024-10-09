import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import consultationsService from "../services/consultation-service";
import { setMessage } from "../../utils/global-messages-slices";

const initialState = {
  consultation: {},
  consultations: [],
  error: false,
  success: false,
  loading: false,
  message: null,
};

export const getAllConsultations = createAsyncThunk(
  "consultation/getAll",
  async (_, thunkAPI) => {
    const data = await consultationsService.getAllConsultations();

    if (data.error) {
      return thunkAPI.rejectWithValue(data.error.message);
    }
    return data;
  }
);
export const createConsultation = createAsyncThunk(
  "consultation/create",
  async (consultation, thunkAPI) => {
    const data = await consultationsService.createConsultation(consultation);

    if (data.error) {
      const errorMessage = Array.isArray(data.message)
        ? data.message[0] // Se for array, pega o primeiro erro
        : data.message; //
      thunkAPI.dispatch(
        setMessage({ message: errorMessage, error: true, success: false })
      );
      return thunkAPI.rejectWithValue(data.message[0]);
    }

    thunkAPI.dispatch(
      setMessage({
        message: "Atendimento registrado com sucesso!",
        error: false,
        success: true,
      })
    );
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

export const consultationSlice = createSlice({
  name: "consultation",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllConsultations.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getAllConsultations.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.consultations = action.payload;
      })
      .addCase(createConsultation.pending, (state) => {
        state.loading = true;
        state.error = false;
      })

      .addCase(createConsultation.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.consultation = action.payload;
        state.message = `Atendimento registrado com sucesso!`;
      })
      .addCase(createConsultation.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.success = false;

        state.message = action.payload;

        state.consultation = {};
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

export const { resetMessage } = consultationSlice.actions;
export default consultationSlice.reducer;
