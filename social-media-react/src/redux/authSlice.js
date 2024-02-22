import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosService from "../helpers/axios";

const baseURL = process.env.REACT_APP_API_URL;

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await axiosService.post(`${baseURL}/auth/login/`, {
        username,
        password,
      });
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
      const response = await axiosService.post(`${baseURL}/auth/register/`, {
        first_name,
        last_name,
        username,
        email,
        password,
        bio,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const editUser = createAsyncThunk(
  "auth/editUser",
  async (
    { formData, first_name, last_name, bio, userId },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosService.patch(`${baseURL}/user/${userId}/`, {
        formData,
        first_name,
        last_name,
        bio,
        userId,
      });
      // Update the user in the store
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue, getState }) => {
    try {
      const { refreshToken } = getState().auth;

      const response = await axiosService.post(`${baseURL}/auth/logout/`, {
        refresh: refreshToken,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    user: null,
    accessToken: null,
    refreshToken: null,
    error: null,
  },
  reducers: {
    setAuthTokens: (state, action) => {
      state.accessToken = action.payload.access;
      state.refreshToken = action.payload.refresh;
      state.user = action.payload.user;

      localStorage.setItem(
        "auth",
        JSON.stringify({
          access: action.payload.access,
          refresh: action.payload.refresh,
        })
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.access;
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
        state.user = action.payload.user;
        state.accessToken = action.payload.access;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(editUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.access;
        state.loading = false;
      })
      .addCase(editUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.loading = false;
        localStorage.removeItem("auth");
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      });
  },
});

export const { setAuthTokens } = authSlice.actions;
export default authSlice.reducer;
