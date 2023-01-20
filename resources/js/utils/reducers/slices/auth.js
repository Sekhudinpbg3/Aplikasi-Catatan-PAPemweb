import { createSlice } from "@reduxjs/toolkit";

const Auth = createSlice({
  name: "Auth",
  initialState: {
    access_token: "",
  },
  reducers: {
    setToken: (state, { payload }) => {
      const { type, data = "" } = payload;
      if (type === "save") {
        state.access_token = data;
      }
      if (type === "remove") {
        state.access_token = "";
      }
    },
  },
});

export default Auth;
