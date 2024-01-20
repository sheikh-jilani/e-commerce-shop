import { createSlice } from "@reduxjs/toolkit";
const initialState = localStorage.getItem("userCredentials")
  ? JSON.parse(localStorage.getItem("userCredentials"))
  : {
      user: null,
    };
const userCredentials = createSlice({
  name: "userCredentials",
  initialState,
  reducers: {
    addUserCredentials(state, action) {
      state.user = action.payload;
      localStorage.setItem("userCredentials", JSON.stringify(state));
    },
    logout(state, action) {
      state.user = null;
      localStorage.removeItem("userCredentials");
    },
  },
});
export const { addUserCredentials, logout } = userCredentials.actions;
export default userCredentials.reducer;
