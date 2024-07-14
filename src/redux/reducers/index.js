import {
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
  FETCH_MY_QUESTIONS_REQUEST,
  FETCH_MY_QUESTIONS_SUCCESS,
  FETCH_MY_QUESTIONS_FAILURE,
  FETCH_MY_AVATAR_REQUEST,
  FETCH_MY_AVATAR_SUCCESS,
  FETCH_MY_AVATAR_FAILURE,
} from "../actions";

const initialState = {
  userId: 123,
  questionData: [],
  popularTagsData: [],
  lastUsedTagsData: [],
  avatarUrl: "",
  loading: true,
  error: null,
};

const questionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA_REQUEST:
    case FETCH_MY_QUESTIONS_REQUEST:
    case FETCH_MY_AVATAR_REQUEST:  
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        questionData: action.payload.questionData,
        popularTagsData: action.payload.popularTagsData,
        loading: false,
      };
    case FETCH_MY_QUESTIONS_SUCCESS:
      return {
        ...state,
        questionData: action.payload.questionData,
        lastUsedTagsData: action.payload.lastUsedTagsData,
        loading: false,
      };  
    case FETCH_MY_AVATAR_SUCCESS:
      return {
        ...state,
        avatarUrl: action.payload.avatarUrl,
        loading: false,
      };  
    case FETCH_DATA_FAILURE:
    case FETCH_MY_QUESTIONS_FAILURE:
    case FETCH_MY_AVATAR_FAILURE:  
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default questionsReducer;
