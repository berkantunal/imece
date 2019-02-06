import axios from '$/lib/axios';

export const SET_LOGIN_MODAL_VISIBILITY = 'SET_LOGIN_MODAL_VISIBILITY';
export const LOGIN = 'LOGIN';

export function setLoginModalVisibility(value) {
  return dispatch => {
    dispatch({
      payload: value,
      type: SET_LOGIN_MODAL_VISIBILITY
    });
  };
}

export function login(email, password) {
  return dispatch => {
    dispatch({
      payload: axios()
        .post(`user/login`, {
          email,
          password
        })
        .then(res => res.data),
      type: LOGIN
    });
  };
}
