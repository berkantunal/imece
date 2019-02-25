import axios from '$/lib/axios';
import { objectToFormData } from '$/helpers/form';

export const LOGIN = 'LOGIN';
export const SET_LOGIN_MODAL_VISIBILITY = 'SET_LOGIN_MODAL_VISIBILITY';
export const SET_SIGNUP_MODAL_VISIBILITY = 'SET_SIGNUP_MODAL_VISIBILITY';
export const SIGNUP_PENDING = 'SIGNUP_PENDING';
export const SIGNUP_FULFILLED = 'SIGNUP_FULFILLED';
export const SIGNUP_REJECTED = 'SIGNUP_REJECTED';
export const LOGIN_PENDING = 'LOGIN_PENDING';
export const LOGIN_FULFILLED = 'LOGIN_FULFILLED';
export const LOGIN_REJECTED = 'LOGIN_REJECTED';
export const SET_LOGOUT = 'SET_LOGOUT';
export const SET_FAVORITES_PENDING = 'SET_FAVORITES_PENDING';
export const SET_FAVORITES_FULFILLED = 'SET_FAVORITES_FULFILLED';
export const SET_FAVORITES_REJECTED = 'SET_FAVORITES_REJECTED';
export const UPDATE_PENDING = 'UPDATE_PENDING';
export const UPDATE_FULFILLED = 'UPDATE_FULFILLED';
export const UPDATE_REJECTED = 'UPDATE_REJECTED';
export const SET_UPDATE_STATUS = 'SET_UPDATE_STATUS';

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

export function logout() {
  return dispatch => {
    dispatch({
      type: SET_LOGOUT
    });
  };
}

export function updateUserInformation(userId, form) {
  const formData = objectToFormData(form);

  return dispatch => {
    dispatch({
      payload: axios()
        .put(`user/${userId}`, formData)
        .then(res => res.data),
      type: 'UPDATE'
    });
  };
}

export function setUpdateStatus(status) {
  return dispatch => {
    dispatch({
      payload: status,
      type: SET_UPDATE_STATUS
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
