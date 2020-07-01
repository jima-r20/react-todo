import { combineReducers } from 'redux';
import authReducer from './authReducer';
import todoReducer from './todoReducer';
import pageReducer from './pageReducer';

export default combineReducers({
  auth: authReducer,
  todo: todoReducer,
  page: pageReducer,
});
