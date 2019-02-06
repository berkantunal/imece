import { combineReducers } from 'redux';
import city from './city';
import login from './login';
import signup from './signup';

const rootReducer = combineReducers({
  city,
  login,
  signup
});

export default rootReducer;
