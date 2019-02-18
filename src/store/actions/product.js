import axios from '$/lib/axios';

export const PRODUCTS_PENDING = 'PRODUCTS_PENDING';
export const PRODUCTS_FULFILLED = 'PRODUCTS_FULFILLED';
export const PRODUCTS_REJECTED = 'PRODUCTS_REJECTED';
export const PRODUCT_COUNT_PENDING = 'PRODUCT_COUNT_PENDING';
export const PRODUCT_COUNT_FULFILLED = 'PRODUCT_COUNT_FULFILLED';
export const PRODUCT_COUNT_REJECTED = 'PRODUCT_COUNT_REJECTED';
export const NEW_STARTED_PRODUCTS_PENDING = 'NEW_STARTED_PRODUCTS_PENDING';
export const NEW_STARTED_PRODUCTS_FULFILLED = 'NEW_STARTED_PRODUCTS_FULFILLED';
export const NEW_STARTED_PRODUCTS_REJECTED = 'NEW_STARTED_PRODUCTS_REJECTED';
export const CURRENT_PRODUCT_PENDING = 'CURRENT_PRODUCT_PENDING';
export const CURRENT_PRODUCT_FULFILLED = 'CURRENT_PRODUCT_FULFILLED';
export const CURRENT_PRODUCT_REJECTED = 'CURRENT_PRODUCT_REJECTED';
export const FAVORITE_PRODUCTS_PENDING = 'FAVORITE_PRODUCTS_PENDING';
export const FAVORITE_PRODUCTS_FULFILLED = 'FAVORITE_PRODUCTS_FULFILLED';
export const FAVORITE_PRODUCTS_REJECTED = 'FAVORITE_PRODUCTS_REJECTED';
export const USER_PRODUCTS_PENDING = 'USER_PRODUCTS_PENDING';
export const USER_PRODUCTS_FULFILLED = 'USER_PRODUCTS_FULFILLED';
export const USER_PRODUCTS_REJECTED = 'USER_PRODUCTS_REJECTED';

export function getProducts(opts) {
  const { filter, limit, offset, orderType, slugs, userId } = opts;

  return axios()
    .get(`product`, {
      params: {
        filter,
        limit,
        offset,
        orderType,
        slugs,
        userId
      }
    })
    .then(res => res.data);
}

export function getProductList(limit, offset, orderType, filter) {
  return dispatch => {
    dispatch({
      payload: getProducts({ filter, limit, offset, orderType }),
      type: 'PRODUCTS'
    });
  };
}

export function getFavoriteProductList(favorites, limit, offset, orderType) {
  return dispatch => {
    dispatch({
      payload: getProducts({ limit, offset, orderType, slugs: favorites }),
      type: 'FAVORITE_PRODUCTS'
    });
  };
}

export function getUsersProductList(userId) {
  return dispatch => {
    dispatch({
      payload: getProducts({ userId }),
      type: 'USER_PRODUCTS'
    });
  };
}

export function getCount(filter) {
  return dispatch => {
    dispatch({
      payload: axios()
        .get(`product/count`, {
          params: { filter }
        })
        .then(res => res.data),
      type: 'PRODUCT_COUNT'
    });
  };
}

export function getNewStartedProducts(limit = 12) {
  return dispatch => {
    dispatch({
      payload: getProducts({ limit, orderType: 'timestampHigh' }),
      type: 'NEW_STARTED_PRODUCTS'
    });
  };
}

export function getProductBySlug(slug = null) {
  if (!slug) {
    return false;
  }
  return dispatch => {
    dispatch({
      payload: axios()
        .get(`product/${slug}`)
        .then(res => res.data),
      type: 'CURRENT_PRODUCT'
    });
  };
}

export function createProduct(form) {
  return axios()
    .post(`product/`, form)
    .then(res => res.data);
}

export function updateProduct(productId, form) {
  return axios()
    .put(`product/${productId}`, form)
    .then(res => res.data);
}

export function destroyProduct(productId, userId) {
  return axios()
    .delete(`product/user/${productId}/${userId}`)
    .then(res => res.data);
}
