import { createSlice } from "@reduxjs/toolkit";
import API_BASE_URL from "./../../components/appConfig";
import Cookies from "js-cookie";

const cookieData = JSON.parse(Cookies.get("knowledgeshare") || "{}");

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

export const fetchMyQuestionsAndLastUsedTags = () => async (dispatch) => {
  dispatch(fetchMyQuestionsRequest());
  try {
    const [questionsResponse, tagsResponse] = await Promise.all([
      fetch(
        `${API_BASE_URL}/api/v1/questions/all/user/${cookieData.USERID_KEY}`
      ),
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
};

export const fetchMyAvatorUrl = () => async (dispatch) => {
  dispatch(fetchMyAvatarRequest());
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/v1/auth/get-avator/${cookieData.USERID_KEY}`
    );

    if (response.ok) {
      const avatarData = await response.json();
      if (Array.isArray(avatarData) && avatarData.length > 0) {
        dispatch(fetchMyAvatarSuccess({ avatarUrl: avatarData[0].url }));
      } else {
        console.error("Invalid avatar data structure");
      }
    } else {
      console.error("Failed to fetch avatarUrl");
    }
  } catch (error) {
    dispatch(fetchMyAvatarFailure(error.message));
  }
};

export default myQuestionsSlice.reducer;
