import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = "http://localhost:8000/api/auth";

const initialState = {
  loading: false,
  user: null,
  accessToken: null,
  refreshToken: null,
  status: "idle",
  error: null,
};

export const registerUser = createAsyncThunk(
  "register/registerUser",
  async (data) => {
    try {
      const response = await axios.post(`${baseURL}/register/`, data);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.accessToken = action.payload.access;
        state.refreshToken = action.payload.refresh;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default registerSlice.reducer;
