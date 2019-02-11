import { optionList } from '$/helpers';
import {
  SET_CATEGORIES_PENDING,
  SET_CATEGORIES_FULFILLED,
  SET_CATEGORIES_REJECTED
} from '../actions/product-category';

const initialState = {
  error: false,
  fetched: false,
  list: [],
  loading: false,
  optionList: []
};

export default (state = initialState, action) => {
  // eslint-disable-next-line no-console
  // console.log('payload', action.type);
  switch (action.type) {
    case SET_CATEGORIES_PENDING:
      return {
        ...state,
        fetched: false,
        loading: true
      };
    case SET_CATEGORIES_FULFILLED:
      return {
        ...state,
        fetched: true,
        list: action.payload.data,
        loading: false,
        optionList: optionList(action.payload.data, 'productCategoryId', 'title')
      };
    case SET_CATEGORIES_REJECTED:
      return {
        ...state,
        error: true,
        fetched: false,
        loading: false
      };
    default:
      return state;
  }
};
