import { createSlice } from "@reduxjs/toolkit";
import API_BASE_URL, {FLASK_BASE_URL} from "./../../components/appConfig";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    query: "",
    searchResults: null,
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
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setSearchQuery, setSearchResults, setError, setLoading } =
  searchSlice.actions;

export const searchData = (search_query, filter) => async (dispatch) => {

  try {
    dispatch(setLoading(true));
    const response = await fetch(`${FLASK_BASE_URL}/api/v1/auto_search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ search_query, filter }),
    });
  
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
  
    const data = await response.json();
    dispatch(setSearchResults(data));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export default searchSlice.reducer;
