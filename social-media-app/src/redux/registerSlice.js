import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosService from "../helpers/axios";

export const registerUser = createAsyncThunk(
  "register/registerUser",
  async ({ username, password, email, first_name, last_name, bio }) => {
    try {
      const response = await axiosService.post("/auth/register/", {
        username,
        password,
        email,
        first_name,
        last_name,
        bio,
      });
      console.log("res", response.data);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

const registerSlice = createSlice({
  name: "register",
  initialState: {
    user: null,
    loading: false,
    status: "idle",
    error: null,
  },
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
