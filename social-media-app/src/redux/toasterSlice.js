import { createSlice } from "@reduxjs/toolkit";

const toasterSlice = createSlice({
  name: "toaster",
  initialState: {
    title: "",
    show: false,
    message: "",
    type: "",
  },

  reducers: {
    setToaster: (state, action) => {
      return { ...state, ...action.payload, show: true };
    },
    hideToaster: (state, action) => {
      return { ...state, show: false };
    },
  },
});

export const { setToaster, hideToaster } = toasterSlice.actions;
export const selectToaster = (state) => state.toaster;
export default toasterSlice.reducer;
