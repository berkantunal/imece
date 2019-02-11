import {
  SET_PRODUCTS_PENDING,
  SET_PRODUCTS_FULFILLED,
  SET_PRODUCTS_REJECTED,
  SET_PRODUCT_COUNT_FULFILLED
} from '../actions/product';

const initialState = {
  count: 0,
  error: false,
  fetched: false,
  list: [],
  loading: false
};

export default (state = initialState, action) => {
  // eslint-disable-next-line no-console
  // console.log('payload', action.type);
  switch (action.type) {
    case SET_PRODUCTS_PENDING:
      return {
        ...state,
        fetched: false,
        loading: true
      };
    case SET_PRODUCTS_FULFILLED:
      return {
        ...state,
        fetched: true,
        list: action.payload.data,
        loading: false
      };
    case SET_PRODUCTS_REJECTED:
      return {
        ...state,
        error: true,
        fetched: false,
        loading: false
      };
    case SET_PRODUCT_COUNT_FULFILLED:
      return {
        ...state,
        count: action.payload.data
      };
    default:
      return state;
  }
};
