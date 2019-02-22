import { combineReducers } from 'redux';
import category from './product-category';
import city from './city';
import user from './user';
import menu from './menu';
import product from './product';

const rootReducer = combineReducers({
  category,
  city,
  menu,
  product,
  user
});

export default rootReducer;
