import { configureStore } from '@reduxjs/toolkit';
import questionsReducer from './reducers/questionSlice';
import myQuestionsReducer from './reducers/myQuestionsSlice';
import tagsReducer from './reducers/tagsSlice';

const store = configureStore({
  reducer: {
    questions: questionsReducer,
    myQuestions: myQuestionsReducer,
    tags: tagsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export { store };