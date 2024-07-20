import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API_BASE_URL from "../../components/appConfig";

// Initial state
const initialState = {
  allQuestionsTaggedData: [],
  popularTagsData: [],
  taggedTagData: {},
  loading: false,
  error: null,
};

// Reducer functions

// Create slice
const questionsTaggedSlice = createSlice({
  name: "questionsTagged",
  initialState,
  reducers: {
    fetchQuestionsTaggedRequest: (state) => {
      state.loading = true;
      state.error = null;
    },

    fetchQuestionsTaggedSuccess: (state, action) => {
      state.allQuestionsTaggedData = action.payload.allQuestionsTaggedData;
      state.loading = false;
    },

    fetchQuestionsTaggedFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },

    fetchPopularTagsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchPopularTagsSuccess: (state, action) => {
      state.popularTagsData = action.payload.popularTagsData;
      state.loading = false;
    },
    fetchPopularTagsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },
    fetchTaggedTagRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchTaggedTagSuccess: (state, action) => {
      state.taggedTagData = action.payload.taggedTagData;
      state.loading = false;
    },
    fetchTaggedTagFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },
  },
});

export const fetchQuestionsTagged = createAsyncThunk(
  "questionsTagged/fetchQuestionsTagged",
  async (tagId, { dispatch }) => {
    try {
      // Fetch popular tags first
      dispatch(fetchPopularTagsRequest());
      const popularTagsResponse = await fetch(
        `${API_BASE_URL}/api/v1/tags/popular-tags/`
      );
      if (!popularTagsResponse.ok) {
        dispatch(
          fetchPopularTagsFailure({ error: "Failed to fetch popular tags" })
        );
        throw new Error(
          `HTTP error! Popular Tags Status: ${popularTagsResponse.status}`
        );
      }
      const popularTagsData = await popularTagsResponse.json();
      dispatch(fetchPopularTagsSuccess({ popularTagsData: popularTagsData }));

      // Fetch questions
      dispatch(fetchQuestionsTaggedRequest());
      const questionsResponse = await fetch(
        `${API_BASE_URL}/api/v1/questions/tagged/${tagId}`
      );
      if (!questionsResponse.ok) {
        dispatch(
          fetchQuestionsTaggedFailure({ error: "Failed to fetch questions" })
        );
        throw new Error(
          `HTTP error! Questions Status: ${questionsResponse.status}`
        );
      }
      const questionsData = await questionsResponse.json();
      dispatch(
        fetchQuestionsTaggedSuccess({ allQuestionsTaggedData: questionsData })
      );

      // Fetch tag data
      dispatch(fetchTaggedTagRequest());
      const tagResponse = await fetch(
        `${API_BASE_URL}/api/v1/tags/all/${tagId}`
      );
      if (!tagResponse.ok) {
        dispatch(fetchTaggedTagFailure({ error: "Failed to fetch tag data" }));
        throw new Error(`HTTP error! Tag Status: ${tagResponse.status}`);
      }
      const tagData = await tagResponse.json();
      dispatch(fetchTaggedTagSuccess({ taggedTagData: tagData }));
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  }
);

export const {
  fetchQuestionsTaggedRequest,
  fetchQuestionsTaggedSuccess,
  fetchQuestionsTaggedFailure,
  fetchPopularTagsRequest,
  fetchPopularTagsSuccess,
  fetchPopularTagsFailure,
  fetchTaggedTagRequest,
  fetchTaggedTagSuccess,
  fetchTaggedTagFailure,
} = questionsTaggedSlice.actions;

export default questionsTaggedSlice.reducer;
