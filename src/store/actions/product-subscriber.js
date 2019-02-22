import axios from '$/lib/axios';

export function setProductSubscriber(userId, form) {
  return axios()
    .post(`product-subscriber/${userId}`, form)
    .then(res => res.data);
}
