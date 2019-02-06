import { SET_CITIES_PENDING, SET_CITIES_FULFILLED, SET_CITIES_REJECTED } from '../actions/city';

const initialState = {
  error: false,
  fetched: false,
  list: [],
  loading: false
};

export default (state = initialState, action) => {
  // eslint-disable-next-line no-console
  // console.log('payload', action.type);
  switch (action.type) {
    case SET_CITIES_PENDING:
      return {
        ...state,
        fetched: false,
        loading: true
      };
    case SET_CITIES_FULFILLED:
      return {
        ...state,
        fetched: true,
        list: action.payload.data,
        loading: false
      };
    case SET_CITIES_REJECTED:
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
