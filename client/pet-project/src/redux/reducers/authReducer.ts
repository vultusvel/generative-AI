import { createSlice } from "@reduxjs/toolkit";

const authReducer = createSlice({
  name: "auth",
  initialState: {
    user: {
      userData: {
        _id: "",
        username: "",
      },
      accessToken: "",
    },
    isAuthenticated: false,
  },
  reducers: {
    signIn: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    signOutFrom: (state) => {
      state.user = {
        userData: {
          _id: "",
          username: "",
        },
        accessToken: "",
      };
      state.isAuthenticated = false;
    },
  },
});

export const { signIn, signOutFrom } = authReducer.actions;
export default authReducer.reducer;
