import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/authSlice";
import toasterReducer from "./toasterSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    toaster: toasterReducer,
  },
});

export default store;
