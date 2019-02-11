import { combineReducers } from 'redux';
import category from './product-category';
import city from './city';
import user from './user';
import product from './product';

const rootReducer = combineReducers({
  category,
  city,
  product,
  user
});

export default rootReducer;
