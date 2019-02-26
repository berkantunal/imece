import { combineReducers } from 'redux';
import subscriber from './product-subscriber';
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
  subscriber,
  user
});

export default rootReducer;
