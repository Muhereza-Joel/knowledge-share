import { createSlice } from "@reduxjs/toolkit";

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

export default myQuestionsSlice.reducer;
