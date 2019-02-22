import axios from '$/lib/axios';

export function setOrder(userId, form) {
  return axios()
    .post(`order/${userId}`, form)
    .then(res => res.data);
}
