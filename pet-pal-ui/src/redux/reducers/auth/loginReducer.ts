import { createSession } from "@/utils/auth/session";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { POST } from "@/utils/api";
import { NavigateFunction } from "react-router-dom";
import { ROUTES } from "@/constants/routes";

const initialState = {
  error: "",
  isAuthenticated: false,
  loading: false,
  user: {},
};

export type Credentials = {
  email: string;
  password: string;
};

export const login = createAsyncThunk(
  "auth/login",
  async (
    {
      credentials,
      navigate,
    }: { credentials: Credentials; navigate: NavigateFunction },
    { rejectWithValue }
  ) => {
    try {
      const response = await POST("auth/login", {
        body: {
          email: credentials.email,
          password: credentials.password,
        },
      });
      const { token, accessType } = response.data;

      createSession({
        token,
        accessType,
      });

      navigate(ROUTES.HOME, { replace: true });
      return response;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to log in. Please try again.";
      return rejectWithValue({ error: errorMessage });
    }
  }
);

const LoginReducer = createSlice({
  name: "auth/login",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = {};
    },
    validate: (state, action: any) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(login.fulfilled, (state, action: any) => {
        state.loading = false;
        state.error = "";
        state.isAuthenticated = true;
        state.user = action.payload.data.user;
      })
      .addCase(login.rejected, (state, action: any) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload ? action.payload.error : "Unknown error";
      });
  },
});

export default LoginReducer.reducer;
export const { logout, validate } = LoginReducer.actions;
