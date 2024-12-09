import { configureStore } from "@reduxjs/toolkit";
import userLoginReducer from "./Slices/LoginSlice";

const store = configureStore({
  reducer: {
    userLogin: userLoginReducer,
  },
});

export default store;
