import axios from '$/lib/axios';

export const SET_CATEGORIES_PENDING = 'SET_CATEGORIES_PENDING';
export const SET_CATEGORIES_FULFILLED = 'SET_CATEGORIES_FULFILLED';
export const SET_CATEGORIES_REJECTED = 'SET_CATEGORIES_REJECTED';

export function getCategories() {
  return dispatch => {
    dispatch({
      payload: axios()
        .get(`product-category`)
        .then(res => res.data),
      type: 'SET_CATEGORIES'
    });
  };
}
