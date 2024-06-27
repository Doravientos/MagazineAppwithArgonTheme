import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import articleSlice from "./slices/articleSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    article: articleSlice
  },
});

export default store;