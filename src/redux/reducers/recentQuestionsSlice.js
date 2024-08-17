import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API_BASE_URL from "./../../components/appConfig";

const recentQuestionSlice = createSlice({
  name: "dashboard",
  initialState: {
    questionData: [],
    lastUsedTagsData: [],
    loading: true,
    error: null,
  },

  reducers: {
    fetchDataRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchDataSuccess(state, action) {
      state.questionData = action.payload.questionData;
      state.lastUsedTagsData = action.payload.lastUsedTagsData;
      state.loading = false;
    },
    fetchDataFailure(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },
  },
});

export const fetchRecentQuestions = createAsyncThunk(
  "dashboard/fetchRecentQuestions",
  async (_, { getState, dispatch }) => {
    const state = getState();
    const { questionData } = state.recentQuestions;
    if (questionData && questionData.length > 0) {
      // Questions already exist in state, no need to fetch
      return;
    }

    dispatch(fetchDataRequest());

    try {
      const [questionsResponse, tagsResponse] = await Promise.all([
        fetch(`${API_BASE_URL}/api/v1/questions/recent`),
        fetch(`${API_BASE_URL}/api/v1/tags/most-used-tags/`),
      ]);

      if (!questionsResponse.ok || !tagsResponse.ok) {
        throw new Error(
          `HTTP error! Questions Status: ${questionsResponse.status}, Tags Status: ${tagsResponse.status}`
        );
      }

      const [questionsData, tagsData] = await Promise.all([
        questionsResponse.json(),
        tagsResponse.json(),
      ]);

      // Sort questionsData by created_at field
      questionsData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

      dispatch(
        fetchDataSuccess({
          questionData: questionsData,
          lastUsedTagsData: tagsData,
        })
      );
    } catch (error) {
      dispatch(fetchDataFailure({ error: error.message }));
    }
  }
);

export const { fetchDataRequest, fetchDataSuccess, fetchDataFailure } =
  recentQuestionSlice.actions;

export default recentQuestionSlice.reducer;
