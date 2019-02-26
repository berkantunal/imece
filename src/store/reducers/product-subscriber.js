import {
  SET_SUBSCRIBED_PRODUCTS_PENDING,
  SET_SUBSCRIBED_PRODUCTS_FULFILLED,
  SET_SUBSCRIBED_PRODUCTS_REJECTED
} from '../actions/product-subscriber';

const initialState = {
  error: false,
  fetched: false,
  list: [],
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SUBSCRIBED_PRODUCTS_PENDING:
      return {
        ...state,
        fetched: false,
        loading: true
      };
    case SET_SUBSCRIBED_PRODUCTS_FULFILLED:
      return {
        ...state,
        fetched: true,
        list: action.payload.data,
        loading: false
      };
    case SET_SUBSCRIBED_PRODUCTS_REJECTED:
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
