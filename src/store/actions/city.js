import axios from '$/lib/axios';

export const SET_CITIES_PENDING = 'SET_CITIES_PENDING';
export const SET_CITIES_FULFILLED = 'SET_CITIES_FULFILLED';
export const SET_CITIES_REJECTED = 'SET_CITIES_REJECTED';

export function getCities() {
  return dispatch => {
    dispatch({
      payload: axios()
        .get(`city`)
        .then(res => res.data),
      type: 'SET_CITIES'
    });
  };
}
