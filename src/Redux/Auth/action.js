// src/Redux/Auth/action.js
import axios from "axios";
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  LOGOUT,
} from "./actionTypes";

// =============================================
// CONFIGURACIÓN
// =============================================
const API_BASE_URL = 'http://localhost:5000'; // Gateway
const DEVELOPMENT_MODE = true;

// Helper para logs
const log = (action, data) => {
  if (DEVELOPMENT_MODE) {
    console.log(`🔐 Auth Action [${action}]:`, data);
  }
};

// =============================================
// REGISTRO DE USUARIO
// =============================================
export const registerUser = (userData) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });
  log("REGISTER_START", userData);
  
  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/signup`,
      userData.userData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 30000,
      }
    );
    
    log("REGISTER_RESPONSE", response.data);
    
    // Manejo de respuesta exitosa
    if (response.data && response.status === 200) {
      const responseData = response.data;
      
      // Verificar si tiene JWT
      if (responseData.jwt || (responseData.data && responseData.data.jwt)) {
        const jwt = responseData.jwt || responseData.data.jwt;
        const role = responseData.role || responseData.data?.role;
        
        // Guardar JWT
        localStorage.setItem("jwt", jwt);
        log("JWT_SAVED", { jwt: jwt.substring(0, 20) + "...", role });
        
        // Redirección basada en rol
        if (role === "ADMIN") {
          userData.navigate("/admin");
        } else if (role === "SALON_OWNER") {
          userData.navigate("/salon-dashboard");
        } else {
          userData.navigate("/");
        }
      }
      
      dispatch({ type: REGISTER_SUCCESS, payload: responseData });
    }
  } catch (error) {
    log("REGISTER_ERROR", error);
    
    let errorMessage = "Error en el registro";
    
    if (error.response) {
      // Error del servidor
      errorMessage = error.response.data?.message || 
                    error.response.data?.error ||
                    `Error ${error.response.status}: ${error.response.statusText}`;
    } else if (error.request) {
      // Error de red
      errorMessage = "Error de conexión. Verifica que el servidor esté ejecutándose.";
    } else {
      // Error de configuración
      errorMessage = error.message;
    }
    
    dispatch({ type: REGISTER_FAILURE, payload: errorMessage });
  }
};

// =============================================
// LOGIN DE USUARIO
// =============================================
export const loginUser = (userData) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  log("LOGIN_START", { email: userData.data.email });
  
  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/login`,
      userData.data,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 30000,
      }
    );
    
    log("LOGIN_RESPONSE", response.data);
    
    // Manejo de respuesta exitosa
    if (response.data && response.status === 200) {
      const responseData = response.data;
      
      // Verificar si tiene JWT - múltiples formatos posibles
      let jwt = null;
      let role = null;
      
      if (responseData.jwt) {
        jwt = responseData.jwt;
        role = responseData.role;
      } else if (responseData.data && responseData.data.jwt) {
        jwt = responseData.data.jwt;
        role = responseData.data.role;
      } else if (responseData.token) {
        jwt = responseData.token;
        role = responseData.role;
      }
      
      if (jwt) {
        // Guardar JWT
        localStorage.setItem("jwt", jwt);
        log("LOGIN_SUCCESS", { 
          email: userData.data.email, 
          role, 
          jwt: jwt.substring(0, 20) + "..." 
        });
        
        // Redirección basada en rol
        if (role === "ADMIN") {
          userData.navigate("/admin");
        } else if (role === "SALON_OWNER") {
          userData.navigate("/salon-dashboard");
        } else {
          userData.navigate("/");
        }
        
        dispatch({ type: LOGIN_SUCCESS, payload: responseData });
      } else {
        throw new Error("No se recibió token JWT en la respuesta");
      }
    }
  } catch (error) {
    log("LOGIN_ERROR", error);
    
    let errorMessage = "Error en el login";
    
    if (error.response) {
      // Error del servidor
      if (error.response.status === 401) {
        errorMessage = "Email o contraseña incorrectos";
      } else if (error.response.status === 404) {
        errorMessage = "Usuario no encontrado";
      } else {
        errorMessage = error.response.data?.message || 
                      error.response.data?.error ||
                      `Error ${error.response.status}: ${error.response.statusText}`;
      }
    } else if (error.request) {
      // Error de red
      errorMessage = "Error de conexión. Verifica que el servidor esté ejecutándose.";
    } else {
      // Error de configuración
      errorMessage = error.message;
    }
    
    dispatch({ type: LOGIN_FAILURE, payload: errorMessage });
  }
};

// =============================================
// OBTENER PERFIL DE USUARIO
// =============================================
export const getUserProfile = () => async (dispatch) => {
  dispatch({ type: GET_USER_REQUEST });
  
  try {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      throw new Error("No hay token de autenticación");
    }
    
    const response = await axios.get(
      `${API_BASE_URL}/api/users/profile`,
      {
        headers: {
          'Authorization': `Bearer ${jwt}`,
          'Content-Type': 'application/json',
        },
        timeout: 30000,
      }
    );
    
    log("GET_PROFILE_SUCCESS", response.data);
    dispatch({ type: GET_USER_SUCCESS, payload: response.data });
    
  } catch (error) {
    log("GET_PROFILE_ERROR", error);
    
    let errorMessage = "Error al obtener perfil";
    
    if (error.response?.status === 401) {
      // Token expirado o inválido
      localStorage.removeItem("jwt");
      errorMessage = "Sesión expirada. Por favor, inicia sesión nuevamente.";
    } else if (error.response) {
      errorMessage = error.response.data?.message || 
                    error.response.data?.error ||
                    `Error ${error.response.status}`;
    } else if (error.request) {
      errorMessage = "Error de conexión";
    } else {
      errorMessage = error.message;
    }
    
    dispatch({ type: GET_USER_FAILURE, payload: errorMessage });
  }
};

// =============================================
// LOGOUT
// =============================================
export const logout = () => (dispatch) => {
  log("LOGOUT", "Usuario cerrando sesión");
  localStorage.removeItem("jwt");
  dispatch({ type: LOGOUT });
};

// =============================================
// FUNCIONES DE UTILIDAD
// =============================================

// Test de conectividad específico para auth
/*export const testAuthConnectivity = () => async (dispatch) => {
  try {
    log("TEST_CONNECTIVITY", "Probando conexión con el servicio de auth");
    
    // Test ping al gateway
    const gatewayResponse = await axios.get(`${API_BASE_URL}/health`, { timeout: 5000 });
    log("GATEWAY_STATUS", gatewayResponse.data);
    
    //*/