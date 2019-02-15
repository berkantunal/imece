import {
  PRODUCTS_PENDING,
  PRODUCTS_FULFILLED,
  PRODUCTS_REJECTED,
  PRODUCT_COUNT_FULFILLED,
  NEW_STARTED_PRODUCTS_PENDING,
  NEW_STARTED_PRODUCTS_FULFILLED,
  NEW_STARTED_PRODUCTS_REJECTED,
  CURRENT_PRODUCT_PENDING,
  CURRENT_PRODUCT_FULFILLED,
  CURRENT_PRODUCT_REJECTED,
  FAVORITE_PRODUCTS_PENDING,
  FAVORITE_PRODUCTS_FULFILLED,
  FAVORITE_PRODUCTS_REJECTED,
  USER_PRODUCTS_PENDING,
  USER_PRODUCTS_FULFILLED,
  USER_PRODUCTS_REJECTED
} from '../actions/product';

const initialState = {
  count: 0,
  current: {
    data: [],
    error: false,
    fetched: false,
    loading: false
  },
  error: false,
  favoriteProducts: {
    error: false,
    fetched: false,
    list: [],
    loading: false
  },
  fetched: false,
  list: [],
  loading: false,
  newStartedProducts: {
    error: false,
    fetched: false,
    list: [],
    loading: false
  },
  user: {
    error: false,
    fetched: false,
    list: [],
    loading: false
  }
};

export default (state = initialState, action) => {
  // eslint-disable-next-line no-console
  // console.log('payload', action.type);
  switch (action.type) {
    case PRODUCTS_PENDING:
      return {
        ...state,
        fetched: false,
        loading: true
      };
    case PRODUCTS_FULFILLED:
      return {
        ...state,
        fetched: true,
        list: action.payload.data,
        loading: false
      };
    case PRODUCTS_REJECTED:
      return {
        ...state,
        error: true,
        fetched: false,
        loading: false
      };
    case NEW_STARTED_PRODUCTS_PENDING:
      return {
        ...state,
        newStartedProducts: {
          ...state.newStartedProducts,
          fetched: false,
          loading: true
        }
      };
    case NEW_STARTED_PRODUCTS_FULFILLED:
      return {
        ...state,
        newStartedProducts: {
          ...state.newStartedProducts,
          fetched: true,
          list: action.payload.data,
          loading: false
        }
      };
    case NEW_STARTED_PRODUCTS_REJECTED:
      return {
        ...state,
        newStartedProducts: {
          error: true,
          fetched: false,
          loading: false
        }
      };
    case CURRENT_PRODUCT_PENDING:
      return {
        ...state,
        current: {
          ...state.current,
          fetched: false,
          loading: true
        }
      };
    case CURRENT_PRODUCT_FULFILLED:
      return {
        ...state,
        current: {
          ...state.current,
          data: action.payload.data,
          fetched: true,
          loading: false
        }
      };
    case CURRENT_PRODUCT_REJECTED:
      return {
        ...state,
        current: {
          ...state.current,
          error: true,
          fetched: false,
          loading: false
        }
      };
    case FAVORITE_PRODUCTS_PENDING:
      return {
        ...state,
        favoriteProducts: {
          ...state.favoriteProducts,
          fetched: false,
          loading: true
        }
      };
    case FAVORITE_PRODUCTS_FULFILLED:
      return {
        ...state,
        favoriteProducts: {
          ...state.favoriteProducts,
          fetched: true,
          list: action.payload.data,
          loading: false
        }
      };
    case FAVORITE_PRODUCTS_REJECTED:
      return {
        ...state,
        favoriteProducts: {
          ...state.favoriteProducts,
          error: true,
          loading: false
        }
      };
    case USER_PRODUCTS_PENDING:
      return {
        ...state,
        user: {
          ...state.user,
          fetched: false,
          loading: true
        }
      };
    case USER_PRODUCTS_FULFILLED:
      return {
        ...state,
        user: {
          ...state.user,
          fetched: true,
          list: action.payload.data,
          loading: false
        }
      };
    case USER_PRODUCTS_REJECTED:
      return {
        ...state,
        user: {
          ...state.user,
          error: true,
          loading: false
        }
      };
    case PRODUCT_COUNT_FULFILLED:
      return {
        ...state,
        count: action.payload.data
      };
    default:
      return state;
  }
};
