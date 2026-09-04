import axios, { type AxiosRequestConfig } from 'axios';

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    Accept: 'application/json'
  }
} as AxiosRequestConfig);

http.interceptors.request.use(config => {
  config.params = config.params || {};
  config.params['api_key'] = import.meta.env.VITE_TMDB_API_KEY;
  return config;
});

const pureHttp = axios.create({
  baseURL: import.meta.env.VITE_MOCK_API_URL,
  headers: {
    Accept: 'application/json'
  }
} as AxiosRequestConfig);

export default { request: http, pureRequest: pureHttp };
