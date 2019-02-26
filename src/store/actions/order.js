import axios from '$/lib/axios';

export const SET_ORDER_PRODUCTS_PENDING = 'SET_ORDER_PRODUCTS_PENDING';
export const SET_ORDER_PRODUCTS_FULFILLED = 'SET_ORDER_PRODUCTS_FULFILLED';
export const SET_ORDER_PRODUCTS_REJECTED = 'SET_ORDER_PRODUCTS_REJECTED';

export function getOrderProduct(userId) {
  return dispatch => {
    dispatch({
      payload: axios()
        .get(`order/products/${userId}`)
        .then(res => res.data),
      type: 'SET_ORDER_PRODUCTS'
    });
  };
}

export function setOrder(userId, form) {
  return axios()
    .post(`order/${userId}`, form)
    .then(res => res.data);
}
