import {
  SET_SIGNUP_MODAL_VISIBILITY,
  SET_LOGIN_MODAL_VISIBILITY,
  SIGNUP_PENDING,
  SIGNUP_FULFILLED,
  SIGNUP_REJECTED,
  LOGIN_PENDING,
  LOGIN_FULFILLED,
  LOGIN_REJECTED
} from '../actions/user';

const initialState = {
  isLoggedIn: false,
  loadingLoading: false,
  loginModalVisibility: false,
  signedUp: false,
  signupLoading: false,
  signupModalVisibility: false,
  token: null,
  user: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SIGNUP_MODAL_VISIBILITY:
      return {
        ...state,
        signupModalVisibility: action.payload
      };
    case SET_LOGIN_MODAL_VISIBILITY:
      return {
        ...state,
        loginModalVisibility: action.payload
      };
    case SIGNUP_PENDING:
      return {
        ...state,
        signedUp: false,
        signupLoading: true
      };
    case SIGNUP_FULFILLED:
      return {
        ...state,
        isLoggedIn: true,
        signedUp: true,
        signupLoading: false,
        signupModalVisibility: false,
        token: action.payload.token,
        user: action.payload.user
      };
    case SIGNUP_REJECTED:
      return {
        ...state,
        signedUp: false,
        signupError: true,
        signupLoading: false
      };
    case LOGIN_PENDING:
      return {
        ...state,
        isLoggedIn: false,
        loginLoading: true
      };
    case LOGIN_FULFILLED:
      return {
        ...state,
        isLoggedIn: true,
        loginLoading: false,
        loginModalVisibility: false,
        token: action.payload.token,
        user: action.payload.user
      };
    case LOGIN_REJECTED:
      return {
        ...state,
        isLoggedIn: false,
        loginError: true,
        loginLoading: false
      };
    default:
      return state;
  }
};