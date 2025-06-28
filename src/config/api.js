
import axios from 'axios';
// const DEPLOYED=''
const LOCALHOST = 'http://localhost:8081'  // Cambiar puerto

export const API_BASE_URL = LOCALHOST

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.defaults.headers.post['Content-Type'] = 'application/json';

export default api;