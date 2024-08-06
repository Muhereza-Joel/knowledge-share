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
import { thunk } from "redux-thunk";

// Configuration for redux-persist
const persistConfig = {
  key: "root",
  storage: storage,
};

// Combine reducers and apply persist configuration
const rootReducer = combineReducers({
  questions: persistReducer(persistConfig, questionsReducer),
  myQuestions: persistReducer(persistConfig, myQuestionsReducer),
  tags: persistReducer(persistConfig, tagsReducer),
  ui: persistReducer(persistConfig, uiReducer),
  questionsTagged: persistReducer(persistConfig, questionsTaggedReducer),
  calendar: calendarReducer,
  askQuestion: askQuestionReducer,
  search: searchReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(thunk),
});

const persistor = persistStore(store);

export { store, persistor };
