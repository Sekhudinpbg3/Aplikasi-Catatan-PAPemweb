import { createSlice } from "@reduxjs/toolkit";

const Notes = createSlice({
  name: "Notes",
  initialState: {
    notes: [],
    form: {},
    formUpdate: {},
  },
  reducers: {
    setNotes: (state, { payload }) => {
      const { type = "save", data } = payload;
      if (type === "save") {
        state.notes = data;
      }
    },
    setForm: (state, { payload }) => {
      const { type = "save", data } = payload;
      if (type === "save") {
        const key = Object.keys(data)[0];
        const value = Object.values(data)[0];
        state.form = {
          ...state.form,
          [key]: value,
        };
      }

      if (type === "remove") {
        state.form = {};
      }
    },
    setFormUpdate: (state, { payload }) => {
      const { type = "save", data } = payload;
      if (type === "set") {
        state.formUpdate = data;
      }

      if (type === "save") {
        const key = Object.keys(data)[0];
        const value = Object.values(data)[0];
        state.formUpdate = {
          ...state.formUpdate,
          [key]: value,
        };
      }

      if (type === "remove") {
        state.formUpdate = { title: "", description: "" };
      }
    },
  },
});

export default Notes;
