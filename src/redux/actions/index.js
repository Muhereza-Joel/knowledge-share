
export const FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';
export const FETCH_MY_QUESTIONS_REQUEST = 'FETCH_MY_QUESTIONS_REQUEST';
export const FETCH_MY_QUESTIONS_SUCCESS = 'FETCH_MY_QUESTIONS_SUCCESS';
export const FETCH_MY_QUESTIONS_FAILURE = 'FETCH_MY_QUESTIONS_FAILURE';
export const FETCH_MY_AVATAR_REQUEST = 'FETCH_MY_AVATAR_REQUEST';
export const FETCH_MY_AVATAR_SUCCESS = 'FETCH_MY_AVATAR_SUCCESS';
export const FETCH_MY_AVATAR_FAILURE = 'FETCH_MY_AVATAR_FAILURE';

export const fetchDataRequest = () => ({type: FETCH_DATA_REQUEST});
export const fetchDataSuccess = (data) => ({type: FETCH_DATA_SUCCESS, payload: data});
export const fetchDataFailure = (error) => ({type: FETCH_DATA_FAILURE, payload: error});
export const fetchMyQuestionsRequest = () => ({type: FETCH_MY_QUESTIONS_REQUEST});
export const fetchMyQuestionsSuccess = (data) => ({type: FETCH_MY_QUESTIONS_SUCCESS, payload: data});
export const fetchMyQuestionsFailure = (error) => ({type: FETCH_MY_QUESTIONS_FAILURE, payload: error});
export const fetchMyAvatarRequest = () => ({type: FETCH_MY_AVATAR_REQUEST});
export const fetchMyAvatarSuccess = (data) => ({type: FETCH_MY_AVATAR_SUCCESS, payload: data});
export const fetchMyAvatarFailure = (error) => ({type: FETCH_MY_AVATAR_FAILURE, payload: error});