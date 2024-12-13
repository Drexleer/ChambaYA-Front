import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// const apiUrl = `${import.meta.env.API}`;
const apiUrl = "http://localhost:5000";

// Setea el estado de usuario cuando hacen login o logout
export const userLoginSlice = createSlice({
  name: "usersLogin",
  initialState: {
    user: [],
  },
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload;
    },
    logoutUser: (state) => {
      state.user = {};
    },
  },
});

export const { loginUser, logoutUser } = userLoginSlice.actions;

export default userLoginSlice.reducer;

// Hace el fetch del para el login del usuario
export const fetchUserLogin = (form) => {
  return async (dispatch) => {
    let endpoint = apiUrl + `/auth`;
    try {
      const { data } = await axios.post(endpoint, form);

      if (data) {
        dispatch(loginUser(data));
        return { access: true };
      }
    } catch (error) {
      console.log(error);
      return { access: false };
    }
  };
};
