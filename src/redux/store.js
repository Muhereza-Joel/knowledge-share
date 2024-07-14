import { createStore, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import questionsReducer from './reducers';

const store = createStore(questionsReducer, applyMiddleware(thunk));

export default store;