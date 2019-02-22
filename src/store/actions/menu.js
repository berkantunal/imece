import axios from '$/lib/axios';

export const SET_MENU_PENDING = 'SET_MENU_PENDING';
export const SET_MENU_FULFILLED = 'SET_MENU_FULFILLED';
export const SET_MENU_REJECTED = 'SET_MENU_REJECTED';

export function getMenus() {
  return dispatch => {
    dispatch({
      payload: axios()
        .get(`menu`)
        .then(res => res.data),
      type: 'SET_MENU'
    });
  };
}
