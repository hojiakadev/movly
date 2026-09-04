import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

const pureRequest = axios.create({ baseURL: BASE_URL });

const request = axios.create({ baseURL: BASE_URL });

const http = { request, pureRequest };

export default http;
