import axios from '$/lib/axios';

export const SET_SUBSCRIBED_PRODUCTS_PENDING = 'SET_SUBSCRIBED_PRODUCTS_PENDING';
export const SET_SUBSCRIBED_PRODUCTS_FULFILLED = 'SET_SUBSCRIBED_PRODUCTS_FULFILLED';
export const SET_SUBSCRIBED_PRODUCTS_REJECTED = 'SET_SUBSCRIBED_PRODUCTS_REJECTED';

export function setProductSubscriber(userId, form) {
  return axios()
    .post(`product-subscriber/${userId}`, form)
    .then(res => res.data);
}

export function getSubscribedProductList(userId) {
  return dispatch => {
    dispatch({
      payload: axios()
        .get(`product-subscriber/${userId}`)
        .then(res => res.data),
      type: 'SET_SUBSCRIBED_PRODUCTS'
    });
  };
}
