import Axios, { AxiosRequestConfig } from 'axios';
import { get as getCookie } from 'js-cookie';

const httpAuthorizedOptions: AxiosRequestConfig = {
  baseURL: process.env.NODE_ENV != 'production' ? 'http://localhost:5000' : 'http://www.frodoluo.ink:5000',
};
const headers = () => {
  return {
    'Content-type': 'application/json',
    'authorization': getCookie('token') || '',
  };
};
const statusValidator = (status: number) => {
  return true;
};
export const post = (url: string, data: any, options: AxiosRequestConfig = {}) => {
  const opts = { ...httpAuthorizedOptions, headers: headers(), ...options, validateStatus: statusValidator };
  return Axios.post(url, data, opts);
};
export const get = (url: string, data: any = {}, options: AxiosRequestConfig = {}) => {
  const h = headers();
  const opts = { ...httpAuthorizedOptions, headers: headers(), ...options, validateStatus: statusValidator };
  const query = Object.keys(data).map(key => key + '=' + data[key]).join('&');
  return Axios.get(url + query, opts);
};