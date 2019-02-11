/* eslint-disable */
import axios from '$/lib/axios';

export const SET_PRODUCTS_PENDING = 'SET_PRODUCTS_PENDING';
export const SET_PRODUCTS_FULFILLED = 'SET_PRODUCTS_FULFILLED';
export const SET_PRODUCTS_REJECTED = 'SET_PRODUCTS_REJECTED';
export const SET_PRODUCT_COUNT_PENDING = 'SET_PRODUCT_COUNT_PENDING';
export const SET_PRODUCT_COUNT_FULFILLED = 'SET_PRODUCT_COUNT_FULFILLED';
export const SET_PRODUCT_COUNT_REJECTED = 'SET_PRODUCT_COUNT_REJECTED';

export function getProducts(limit, offset, orderType) {
  console.log(orderType);
  return dispatch => {
    dispatch({
      payload: axios()
        .get(`product`, {
          params: {
            limit,
            offset,
            orderType
          }
        })
        .then(res => res.data),
      type: 'SET_PRODUCTS'
    });
  };
}

export function getCount() {
  return dispatch => {
    dispatch({
      payload: axios()
        .get(`product/count`)
        .then(res => res.data),
      type: 'SET_PRODUCT_COUNT'
    });
  };
}
