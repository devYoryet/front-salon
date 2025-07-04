import axios from 'axios';

// CONFIGURACIÓN PARA CONECTAR AL GATEWAY
const GATEWAY_URL = 'http://localhost:5000';  // Gateway en puerto 5000
const LOCALHOST_DIRECT = 'http://localhost';  // Para conexión directa si necesitas

export const API_BASE_URL = GATEWAY_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 segundos timeout
});

// Headers por defecto
api.defaults.headers.post['Content-Type'] = 'application/json';
api.defaults.headers.put['Content-Type'] = 'application/json';
api.defaults.headers.patch['Content-Type'] = 'application/json';

// Interceptor para añadir JWT token automáticamente
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwt');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de respuesta
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado o inválido
      localStorage.removeItem('jwt');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Configuraciones específicas para cada microservicio
export const MICROSERVICE_URLS = {
  USER_SERVICE: `${API_BASE_URL}`,      // Pasa por gateway
  SALON_SERVICE: `${API_BASE_URL}`,     // Pasa por gateway  
  BOOKING_SERVICE: `${API_BASE_URL}`,   // Pasa por gateway
  CATEGORY_SERVICE: `${API_BASE_URL}`,  // Pasa por gateway
};

// Para conexión directa si el gateway falla (desarrollo)
export const DIRECT_URLS = {
  USER_SERVICE: `${LOCALHOST_DIRECT}:8081`,
  SALON_SERVICE: `${LOCALHOST_DIRECT}:8082`, 
  BOOKING_SERVICE: `${LOCALHOST_DIRECT}:8083`,
  CATEGORY_SERVICE: `${LOCALHOST_DIRECT}:8084`,
};

export default api;