import { createSlice } from "@reduxjs/toolkit";

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
        question => question.questionId !== action.payload.id
      );
     
    },
  },
});

export const {
  fetchDataRequest,
  fetchDataSuccess,
  fetchDataFailure,
  addNewQuestion,
  deleteQuestion
} = questionSlice.actions;

export default questionSlice.reducer;
