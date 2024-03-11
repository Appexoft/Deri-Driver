import axios from 'axios';
import Config from 'react-native-config';
import {globalSilentLogout} from '../store/user/state';

const instance = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.CancelToken = axios.CancelToken;
instance.isCancel = axios.isCancel;

instance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response.status === 401) {
      globalSilentLogout();
    }

    return Promise.reject(error);
  },
);

// Token handlers
export const setAuthorization = token => {
  instance.defaults.headers.common['Authorization'] = `${token}`;
};
export const unsetAuthorization = () =>
  delete instance.defaults.headers.common['Authorization'];

export default instance;
