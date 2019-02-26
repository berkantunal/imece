import {
  SET_ORDER_PRODUCTS_PENDING,
  SET_ORDER_PRODUCTS_FULFILLED,
  SET_ORDER_PRODUCTS_REJECTED
} from '../actions/order';

const initialState = {
  product: {
    error: false,
    fetched: false,
    list: [],
    loading: false
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDER_PRODUCTS_PENDING:
      return {
        ...state,
        product: {
          ...state.product,
          fetched: false,
          loading: true
        }
      };
    case SET_ORDER_PRODUCTS_FULFILLED:
      return {
        ...state,
        product: {
          ...state.product,
          fetched: true,
          list: action.payload.data,
          loading: false
        }
      };
    case SET_ORDER_PRODUCTS_REJECTED:
      return {
        ...state,
        product: {
          ...state.product,
          error: true,
          fetched: false,
          loading: false
        }
      };
    default:
      return state;
  }
};
