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
