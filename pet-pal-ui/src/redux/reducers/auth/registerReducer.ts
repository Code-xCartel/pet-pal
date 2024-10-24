import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { POST } from "@/utils/api";

const initialState = {
  error: "",
  loading: false,
  isRegistered: false,
};

export type Credentials = {
  email: string;
  password: string;
  username: string;
};

export const register = createAsyncThunk(
  "auth/register",
  async (
    { credentials }: { credentials: Credentials },
    { rejectWithValue }
  ) => {
    try {
      const response = await POST("auth/register", {
        body: {
          username: credentials.username,
          email: credentials.email,
          password: credentials.password,
        },
      });
      return response;
    } catch (error: any) {
      const errorMessage =
        error.message || "Failed to register. Please try again.";
      return rejectWithValue({ error: errorMessage });
    }
  }
);

const RegisterReducer = createSlice({
  name: "auth/register",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
        state.error = "";
        state.isRegistered = true;
      })
      .addCase(register.rejected, (state, action: any) => {
        state.loading = false;
        state.isRegistered = false;
        state.error = action.payload ? action.payload.error : "Unknown error";
      });
  },
});

export default RegisterReducer.reducer;
