import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import Auth from "./slices/auth";
import Notes from "./slices/notes";
import User from "./slices/user";

const reducers = {
  auth: Auth.reducer,
  user: User.reducer,
  notes: Notes.reducer,
};

const actions = {
  authAction: Auth.actions,
  userAction: User.actions,
  notesAction: Notes.actions,
};

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export { actions, store };
