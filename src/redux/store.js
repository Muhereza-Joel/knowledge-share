import { combineReducers } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session'; // Use session storage
import questionsReducer from './reducers/questionSlice';
import myQuestionsReducer from './reducers/myQuestionsSlice';
import tagsReducer from './reducers/tagsSlice';
import uiReducer from './reducers/uiSlice';
import calendarReducer from './reducers/calendarSlice';
import { thunk } from 'redux-thunk';

// Configuration for redux-persist
const persistConfig = {
  key: 'root',
  storage: storage,
  
};

// Combine reducers and apply persist configuration
const rootReducer = {
  questions: persistReducer(persistConfig, questionsReducer),
  myQuestions: persistReducer(persistConfig, myQuestionsReducer),
  tags: persistReducer(persistConfig, tagsReducer),
  ui: persistReducer(persistConfig, uiReducer),
  calendar: persistReducer(persistConfig, calendarReducer),
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