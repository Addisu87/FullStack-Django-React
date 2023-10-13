import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

const initialState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  status: "idle",
  error: null,
};

export const logoutUser = createAsyncThunk("logout/logoutUser", async () => {
  // Perform logout API request if necessary (e.g., revoke tokens on the server)

  // Clear user data from the state
  return null;
});

const logoutSlice = createSlice({
  name: "logout",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.status = "idle";
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default logoutSlice.reducer;
