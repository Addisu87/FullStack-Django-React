import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosService from "../helpers/axios";
import { jwtDecode } from "jwt-decode";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await axiosService.post(
        `${process.env.REACT_APP_API_URL}/auth/login/`,
        { username, password }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (
    { first_name, last_name, username, email, password, bio },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosService.post(
        `${process.env.REACT_APP_API_URL}/auth/register/`,
        { first_name, last_name, username, email, password, bio }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    accessToken: null,
    refreshToken: null,
    loading: false,
    error: null,
  },
  reducers: {
    setAuthTokens: (state, action) => {
      state.accessToken = action.payload.access;
      state.refreshToken = action.payload.refresh;
      state.user = {
        id: jwtDecode(action.payload.access).user_id,
      };

      localStorage.setItem(
        "auth",
        JSON.stringify({
          access: action.payload.access,
          refresh: action.payload.refresh,
        })
      );
    },

    logoutUser: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.loading = false;
      state.error = null;
      localStorage.removeItem("auth");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = jwtDecode(action.payload.access);
        state.accessToken = action.payload.access;
        state.refreshToken = action.payload.refresh;

        localStorage.setItem(
          "auth",
          JSON.stringify({
            access: action.payload.access,
            refresh: action.payload.refresh,
          })
        );
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = jwtDecode(action.payload.access);

        localStorage.setItem(
          "auth",
          JSON.stringify({
            access: action.payload.access,
            refresh: action.payload.refresh,
          })
        );
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setAuthTokens, logoutUser } = authSlice.actions;
export default authSlice.reducer;
