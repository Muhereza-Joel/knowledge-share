import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API_BASE_URL from "./../../components/appConfig";

const myQuestionsSlice = createSlice({
  name: "myQuestions",
  initialState: {
    userId: 123,
    myQuestionData: [],
    lastUsedTagsData: [],
    avatarUrl: "",
    myQuestionsLoading: false,
    myQuestionsError: null,
  },
  reducers: {
    fetchMyQuestionsRequest(state) {
      state.myQuestionsLoading = true;
      state.myQuestionsError = null;
    },
    fetchMyQuestionsSuccess(state, action) {
      state.myQuestionData = action.payload.myQuestionData;
      state.lastUsedTagsData = action.payload.lastUsedTagsData;
      state.myQuestionsLoading = false;
    },
    fetchMyQuestionsFailure(state, action) {
      state.myQuestionsLoading = false;
      state.myQuestionsError = action.payload.error;
    },
    fetchMyAvatarRequest(state) {
      state.myQuestionsLoading = true;
      state.myQuestionsError = null;
    },
    fetchMyAvatarSuccess(state, action) {
      state.avatarUrl = action.payload.avatarUrl;
      state.myQuestionsLoading = false;
    },
    fetchMyAvatarFailure(state, action) {
      state.myQuestionsLoading = false;
      state.myQuestionsError = action.payload.error;
    },
  },
});

export const {
  fetchMyQuestionsRequest,
  fetchMyQuestionsSuccess,
  fetchMyQuestionsFailure,
  fetchMyAvatarRequest,
  fetchMyAvatarSuccess,
  fetchMyAvatarFailure,
} = myQuestionsSlice.actions;

export const fetchMyQuestionsAndLastUsedTags = createAsyncThunk(
  "myQuestions/fetchMyQuestionsAndLastUsedTags",
  async (userId, { dispatch, getState }) => {
    const state = getState();
    const { myQuestionData } = state.myQuestions;

    // Check if myQuestionData is empty
    if (myQuestionData.length > 0) {
      return; // No need to fetch data
    }

    dispatch(fetchMyQuestionsRequest());
    try {
      const [questionsResponse, tagsResponse] = await Promise.all([
        fetch(`${API_BASE_URL}/api/v1/questions/all/user/${userId}`),
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
      dispatch(
        fetchMyQuestionsSuccess({
          myQuestionData: questionsData,
          lastUsedTagsData: tagsData,
        })
      );
    } catch (error) {
      dispatch(fetchMyQuestionsFailure(error.message));
    }
  }
);


export default myQuestionsSlice.reducer;
