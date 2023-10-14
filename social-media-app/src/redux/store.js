import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import loginReducer from "./loginSlice";
import registerReducer from "./registerSlice";
import logoutReducer from "./logoutSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    login: loginReducer,
    register: registerReducer,
    logout: logoutReducer,
  },
});

export default store;
