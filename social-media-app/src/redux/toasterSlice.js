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
      const { title, message, type, show } = action.payload;
      return {
        ...state,
        title: title || "",
        message: message || "",
        type: type || "",
        show: show !== undefined ? show : state.show,
      };
    },
    hideToaster: (state, action) => {
      return { ...state, show: false };
    },
  },
});

export const { setToaster, hideToaster } = toasterSlice.actions;
export const selectToaster = (state) => state.toaster;
export default toasterSlice.reducer;
