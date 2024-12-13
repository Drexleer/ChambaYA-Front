import { configureStore } from "@reduxjs/toolkit";
import userLoginReducer from "./Slices/LoginSlice";
import professionReducer from "./Slices/ProfessionSlice";
import registerReducer from "./Slices/RegisterSlice";

const store = configureStore({
  reducer: {
    userLogin: userLoginReducer,
    professions: professionReducer,
    register: registerReducer,
  },
});

export default store;
