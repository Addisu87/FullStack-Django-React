import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./loginSlice";
import registerReducer from "./registerSlice";
import logoutReducer from "./logoutSlice";

const store = configureStore({
  reducer: {
    login: loginReducer,
    register: registerReducer,
    logout: logoutReducer,
  },
});

export default store;
