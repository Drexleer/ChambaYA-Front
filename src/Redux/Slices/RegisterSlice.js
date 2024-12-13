import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = "http://localhost:5000";

// Async thunk for client registration
export const registerClient = createAsyncThunk(
  "register/registerClient",
  async (clientData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${apiUrl}/client/register`,
        clientData
      );
      return response.data.client;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error registering client"
      );
    }
  }
);

// Async thunk for professional registration
export const registerProfessional = createAsyncThunk(
  "register/registerProfessional",
  async (professionalData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${apiUrl}/prof/register`,
        professionalData
      );
      return response.data.professional;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error registering professional"
      );
    }
  }
);

// Registration slice
const registerSlice = createSlice({
  name: "register",
  initialState: {
    user: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearRegistrationState: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    // Client registration
    builder.addCase(registerClient.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(registerClient.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.success = true;
    });
    builder.addCase(registerClient.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    });

    // Professional registration
    builder.addCase(registerProfessional.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(registerProfessional.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.success = true;
    });
    builder.addCase(registerProfessional.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    });
  },
});

export const { clearRegistrationState } = registerSlice.actions;
export default registerSlice.reducer;
