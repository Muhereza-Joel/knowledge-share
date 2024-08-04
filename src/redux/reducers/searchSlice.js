import { createSlice } from "@reduxjs/toolkit";
import API_BASE_URL from "./../../components/appConfig";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    query: "",
    searchResults: [],
    error: null,
    loading: false,
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.query = action.payload;
    },
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setSearchQuery, setSearchResults, setError } =
  searchSlice.actions;

export const searchData = (query, filter) => async (dispatch) => {

  try {
    const response = await fetch(
      `${API_BASE_URL}/api/v1/search?query=${query}&filter=${filter}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    dispatch(setSearchResults(data));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export default searchSlice.reducer;
