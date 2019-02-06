import axios from 'axios';
import { API_BASE } from '$/config/api';

export default () => {
  const headers = {};
  /* eslint-disable */
  if (typeof localStorage !== 'undefined' && localStorage['user'] !== undefined) {
    const user = JSON.parse(localStorage['user']);

    headers['authorization'] = user.token;
  }
  /* eslint-enable */

  const apiAxios = axios.create({
    baseURL: API_BASE,
    headers
  });

  apiAxios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

  return apiAxios;
};
