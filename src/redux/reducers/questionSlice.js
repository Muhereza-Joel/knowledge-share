import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API_BASE_URL from "./../../components/appConfig";

const questionSlice = createSlice({
  name: "questions",
  initialState: {
    allQuestionData: [],
    allQuestionsPopularTagsData: [],
    allQuestionsLoading: false,
    allQuestionsError: null,
  },
  reducers: {
    fetchDataRequest(state) {
      state.allQuestionsLoading = true;
      state.allQuestionsError = null;
    },
    fetchDataSuccess(state, action) {
      state.allQuestionData = action.payload.allQuestionData;
      state.allQuestionsPopularTagsData =
        action.payload.allQuestionsPopularTagsData;
      state.allQuestionsLoading = false;
    },
    fetchDataFailure(state, action) {
      state.allQuestionsLoading = false;
      state.allQuestionsError = action.payload.error;
    },
    addNewQuestion(state, action) {
      state.allQuestionData.push(action.payload.newQuestion);
    },
    deleteQuestion(state, action) {
      state.allQuestionData = state.allQuestionData.filter(
        (question) => question.questionId !== action.payload.id
      );
    },
    fetchQuestionsTaggedRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchQuestionsTaggedSuccess(state, action) {
      state.allQuestionsTaggedData = action.payload.allQuestionsTaggedData;
      state.popularTagsData = action.payload.popularTagsData;
      state.taggedTagData = action.payload.taggedTagData;
      state.loading = false;
    },
    fetchQuestionsTaggedFailure(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },
  },
});

export const {
  fetchDataRequest,
  fetchDataSuccess,
  fetchDataFailure,
  addNewQuestion,
  deleteQuestion,
} = questionSlice.actions;

export const fetchQuestionsAndTags = createAsyncThunk(
  "questions/fetchQuestionsAndTags",
  async (_, { getState, dispatch }) => {
    const state = getState();
    const { allQuestionData, allQuestionsPopularTagsData } = state.questions;

    // Check if data already exists in the store
    if (allQuestionData.length > 0 && allQuestionsPopularTagsData.length > 0) {
      return; // No need to fetch data
    }

    dispatch(fetchDataRequest());
    try {
      const [questionsResponse, tagsResponse] = await Promise.all([
        fetch(`${API_BASE_URL}/api/v1/questions/all/`),
        fetch(`${API_BASE_URL}/api/v1/tags/popular-tags/`),
      ]);

      if (!questionsResponse.ok || !tagsResponse.ok) {
        throw new Error(
          `HTTP error! Questions Status: ${questionsResponse.status}, Tags Status: ${tagsResponse.status}`
        );
      }

      const [questionData, tagsData] = await Promise.all([
        questionsResponse.json(),
        tagsResponse.json(),
      ]);

      // Sort questionData by created_at in descending order
      questionData.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );

      dispatch(
        fetchDataSuccess({
          allQuestionData: questionData,
          allQuestionsPopularTagsData: tagsData,
        })
      );
    } catch (error) {
      dispatch(fetchDataFailure(error.message));
      console.error("Failed to fetch data:", error);
    }
  }
);

export default questionSlice.reducer;
