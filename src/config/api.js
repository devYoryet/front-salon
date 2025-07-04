import axios from 'axios';

// =============================================
// CONFIGURACIÓN DE URLs
// =============================================
const GATEWAY_URL = 'http://localhost:5000';
const DEVELOPMENT_MODE = true; // Cambiar a false en producción

// URLs para conexión directa (desarrollo/debugging)
const DIRECT_URLS = {
  USER_SERVICE: 'http://localhost:8081',
  SALON_SERVICE: 'http://localhost:8082', 
  BOOKING_SERVICE: 'http://localhost:8083',
  CATEGORY_SERVICE: 'http://localhost:8084',
};

// Configuración principal
export const API_BASE_URL = GATEWAY_URL;

// =============================================
// INSTANCIA PRINCIPAL DE AXIOS
// =============================================
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 segundos
  headers: {
    'Content-Type': 'application/json',
  },
});

// =============================================
// INTERCEPTORS
// =============================================

// Request interceptor - Añade JWT automáticamente
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwt');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Log para debugging
    if (DEVELOPMENT_MODE) {
      console.log('🚀 Request:', {
        method: config.method?.toUpperCase(),
        url: config.url,
        baseURL: config.baseURL,
        fullURL: `${config.baseURL}${config.url}`,
        headers: config.headers,
      });
    }
    
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor - Maneja errores y logs
api.interceptors.response.use(
  (response) => {
    if (DEVELOPMENT_MODE) {
      console.log('✅ Response:', {
        status: response.status,
        url: response.config.url,
        data: response.data,
      });
    }
    return response;
  },
  (error) => {
    console.error('❌ Response Error:', {
      status: error.response?.status,
      message: error.message,
      url: error.config?.url,
      data: error.response?.data,
    });
    
    // Manejo de errores específicos
    if (error.response?.status === 401) {
      console.warn('🔐 Token expirado o inválido');
      localStorage.removeItem('jwt');
      window.location.href = '/login';
    } else if (error.response?.status === 403) {
      console.warn('🚫 Acceso denegado');
    } else if (error.response?.status >= 500) {
      console.error('🔥 Error del servidor');
    } else if (error.code === 'ECONNREFUSED') {
      console.error('🔌 Conexión rechazada - servidor no disponible');
    }
    
    return Promise.reject(error);
  }
);

// =============================================
// FUNCIONES DE UTILIDAD
// =============================================

// Test de conectividad
export const testConnectivity = async () => {
  const results = {
    gateway: null,
    microservices: {},
  };
  
  try {
    // Test Gateway
    const gatewayResponse = await axios.get(`${GATEWAY_URL}/health`, { timeout: 5000 });
    results.gateway = { status: 'UP', data: gatewayResponse.data };
  } catch (error) {
    results.gateway = { status: 'DOWN', error: error.message };
  }
  
  // Test cada microservicio
  const services = [
    { name: 'user', port: 8081 },
    { name: 'salon', port: 8082 },
    { name: 'booking', port: 8083 },
    { name: 'category', port: 8084 },
  ];
  
  for (const service of services) {
    try {
      const response = await axios.get(`http://localhost:${service.port}/test/ping`, { timeout: 5000 });
      results.microservices[service.name] = { status: 'UP', data: response.data };
    } catch (error) {
      results.microservices[service.name] = { status: 'DOWN', error: error.message };
    }
  }
  
  return results;
};

// Test base de datos
export const testDatabase = async () => {
  try {
    const response = await api.get('/test/database');
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.response?.data || error.message };
  }
};

// =============================================
// SERVICIOS ESPECÍFICOS
// =============================================

// Auth Service
export const authService = {
  login: (credentials) => api.post('/auth/login', credentials),
  signup: (userData) => api.post('/auth/signup', userData),
  getProfile: () => api.get('/api/users/profile'),
  logout: () => {
    localStorage.removeItem('jwt');
    return Promise.resolve();
  },
};

// User Service
export const userService = {
  getProfile: () => api.get('/api/users/profile'),
  updateProfile: (data) => api.put('/api/users/profile', data),
  getAllUsers: () => api.get('/api/admin/users'),
};

// Salon Service
export const salonService = {
  getAllSalons: () => api.get('/api/salons'),
  getSalonById: (id) => api.get(`/api/salons/${id}`),
  createSalon: (data) => api.post('/api/salons', data),
  updateSalon: (id, data) => api.put(`/api/salons/${id}`, data),
};

// Booking Service
export const bookingService = {
  createBooking: (data) => api.post('/api/bookings', data),
  getBookings: () => api.get('/api/bookings'),
  getBookingById: (id) => api.get(`/api/bookings/${id}`),
  updateBooking: (id, data) => api.put(`/api/bookings/${id}`, data),
};

// Category Service
export const categoryService = {
  getAllCategories: () => api.get('/api/categories'),
  createCategory: (data) => api.post('/api/categories', data),
};

// =============================================
// FUNCIONES DE FALLBACK (conexión directa)
// =============================================

// Para usar en caso de que el gateway falle
export const createDirectApi = (serviceUrl) => {
  return axios.create({
    baseURL: serviceUrl,
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

// =============================================
// CONFIGURACIÓN PARA CADA MICROSERVICIO
// =============================================
export const MICROSERVICE_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
  },
  USER: {
    PROFILE: '/api/users/profile',
    ALL_USERS: '/api/admin/users',
  },
  SALON: {
    ALL: '/api/salons',
    BY_ID: (id) => `/api/salons/${id}`,
  },
  BOOKING: {
    ALL: '/api/bookings',
    BY_ID: (id) => `/api/bookings/${id}`,
  },
  CATEGORY: {
    ALL: '/api/categories',
  },
  TEST: {
    PING: '/test/ping',
    DATABASE: '/test/database',
    HEALTH: '/test/health',
    WALLET: '/test/wallet',
  },
};

export default api;