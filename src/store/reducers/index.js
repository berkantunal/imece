import { combineReducers } from 'redux';
import category from './product-category';
import city from './city';
import user from './user';
import menu from './menu';
import product from './product';
import order from './order';

const rootReducer = combineReducers({
  category,
  city,
  menu,
  order,
  product,
  user
});

export default rootReducer;
