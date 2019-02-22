import { SET_MENU_PENDING, SET_MENU_FULFILLED, SET_MENU_REJECTED } from '../actions/menu';

const initialState = {
  error: false,
  fetched: false,
  list: [],
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_MENU_PENDING:
      return {
        ...state,
        fetched: false,
        loading: true
      };
    case SET_MENU_FULFILLED:
      return {
        ...state,
        fetched: true,
        list: action.payload.data,
        loading: false
      };
    case SET_MENU_REJECTED:
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
