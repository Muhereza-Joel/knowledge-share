import { combineReducers } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session"; // Use session storage
import questionsReducer from "./reducers/questionSlice";
import myQuestionsReducer from "./reducers/myQuestionsSlice";
import tagsReducer from "./reducers/tagsSlice";
import uiReducer from "./reducers/uiSlice";
import calendarReducer from "./reducers/calendarSlice";
import questionsTaggedReducer from "./reducers/questionsTaggedSlice";
import askQuestionReducer from "./reducers/askQuestionSlice";
import searchReducer from "./reducers/searchSlice";
import notificationsReducer from "./reducers/notificationsSlice";
import userReducer from "./reducers/userSlice";
import recentQuestionsReducer from "./reducers/recentQuestionsSlice";
import { thunk } from "redux-thunk";
import { RESET_STORE } from './actions/actions';

// Configuration for redux-persist
const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["questions", "myQuestions", "recentQuestions", "tags", "ui", "user"],
};

// Combine reducers and apply persist configuration
const appReducer = combineReducers({
  questions: persistReducer(persistConfig, questionsReducer),
  myQuestions: persistReducer(persistConfig, myQuestionsReducer),
  tags: persistReducer(persistConfig, tagsReducer),
  ui: persistReducer(persistConfig, uiReducer),
  user: persistReducer(persistConfig , userReducer),
  notifications: (persistConfig, notificationsReducer),
  recentQuestions: persistReducer(persistConfig, recentQuestionsReducer),
  questionsTagged: questionsTaggedReducer,
  calendar: calendarReducer,
  askQuestion: askQuestionReducer,
  search: searchReducer,
});

const rootReducer = (state, action) => {
  if (action.type === RESET_STORE) {
    state = undefined; // Reset the state to undefined
  }
  return appReducer(state, action);
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(thunk),
});

const persistor = persistStore(store);

export { store, persistor };
