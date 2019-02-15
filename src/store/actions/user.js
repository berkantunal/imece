import axios from '$/lib/axios';

export const LOGIN = 'LOGIN';
export const SET_LOGIN_MODAL_VISIBILITY = 'SET_LOGIN_MODAL_VISIBILITY';
export const SET_SIGNUP_MODAL_VISIBILITY = 'SET_SIGNUP_MODAL_VISIBILITY';
export const SIGNUP_PENDING = 'SIGNUP_PENDING';
export const SIGNUP_FULFILLED = 'SIGNUP_FULFILLED';
export const SIGNUP_REJECTED = 'SIGNUP_REJECTED';
export const LOGIN_PENDING = 'LOGIN_PENDING';
export const LOGIN_FULFILLED = 'LOGIN_FULFILLED';
export const LOGIN_REJECTED = 'LOGIN_REJECTED';
export const SET_FAVORITES_PENDING = 'SET_FAVORITES_PENDING';
export const SET_FAVORITES_FULFILLED = 'SET_FAVORITES_FULFILLED';
export const SET_FAVORITES_REJECTED = 'SET_FAVORITES_REJECTED';

export function setSignupModalVisibility(value) {
  return dispatch => {
    dispatch({
      payload: value,
      type: SET_SIGNUP_MODAL_VISIBILITY
    });
  };
}

export function setLoginModalVisibility(value) {
  return dispatch => {
    dispatch({
      payload: value,
      type: SET_LOGIN_MODAL_VISIBILITY
    });
  };
}

export function login(form) {
  return dispatch => {
    dispatch({
      payload: axios()
        .post(`user/login`, form)
        .then(res => res.data),
      type: 'LOGIN'
    });
  };
}

export function updateUserInformation(userId, form) {
  return axios()
    .put(`user/${userId}`, form)
    .then(res => res.data);
}

export function signup(form) {
  return dispatch => {
    dispatch({
      payload: axios()
        .post(`user/signup`, form)
        .then(res => res.data),
      type: 'SIGNUP'
    });
  };
}

export function setFavorites(userId = 0, favorites = []) {
  if (!userId) {
    return false;
  }

  return dispatch => {
    dispatch({
      payload: axios()
        .put(`user/favorites`, {
          favorites,
          userId
        })
        .then(res => res.data),
      type: 'SET_FAVORITES'
    });
  };
}
