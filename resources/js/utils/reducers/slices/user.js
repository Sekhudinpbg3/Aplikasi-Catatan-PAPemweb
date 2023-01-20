import { createSlice } from "@reduxjs/toolkit";

const User = createSlice({
  name: "User",
  initialState: {
    user: "",
  },
  reducers: {
    setUser: (state, { payload }) => {
      const { type = "save", data } = payload;
      if (type === "save") {
        state.user = data;
      }
    },
  },
});

export default User;
