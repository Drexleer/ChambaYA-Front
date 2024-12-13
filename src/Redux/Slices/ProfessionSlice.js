import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// const apiUrl = `${import.meta.env.API}`;
const apiUrl = "http://localhost:5000";

// Slice para manejar las profesiones
export const professionSlice = createSlice({
  name: "professions",
  initialState: {
    professions: [],
    loading: false,
    error: null,
  },
  reducers: {
    setProfessions: (state, action) => {
      state.professions = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setProfessions, setLoading, setError } = professionSlice.actions;

export default professionSlice.reducer;

// Fetch para obtener las profesiones
export const fetchProfessions = () => {
  return async (dispatch) => {
    let endpoint = apiUrl + "/professions/";
    dispatch(setLoading(true));
    try {
      const { data } = await axios.get(endpoint);
      dispatch(setProfessions(data));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setError(error.response?.data || error.message));
      dispatch(setLoading(false));
    }
  };
};
