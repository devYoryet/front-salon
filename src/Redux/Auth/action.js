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

// USAR GATEWAY COMO PUNTO DE ENTRADA
const API_BASE_URL = 'http://localhost:5000';

export const registerUser = (userData) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });
  console.log("auth action - register", userData);
  
  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/signup`,
      userData.userData
    );
    
    console.log("register response:", response.data);
    
    // Estructura esperada: { success: true, message: "...", data: { jwt: "...", role: "..." } }
    const responseData = response.data;
    
    if (responseData.success && responseData.data?.jwt) {
      localStorage.setItem("jwt", responseData.data.jwt);
      
      // Redirección basada en rol
      if (responseData.data.role === "ADMIN") {
        userData.navigate("/admin");
      } else if (responseData.data.role === "SALON_OWNER") {
        userData.navigate("/salon-dashboard");
      } else {
        userData.navigate("/");
      }
    }
    
    dispatch({ type: REGISTER_SUCCESS, payload: responseData });
  } catch (error) {
    console.log("register error:", error);
    const errorMessage = error.response?.data?.message || error.message;
    dispatch({ type: REGISTER_FAILURE, payload: errorMessage });
  }
};

export const loginUser = (userData) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  console.log("auth action - login", userData);
  
  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/login`,
      userData.data
    );
    
    console.log("login response:", response.data);
    
    // Estructura esperada: { success: true, message: "...", data: { jwt: "...", role: "..." } }
    const responseData = response.data;
    
    if (responseData.success && responseData.data?.jwt) {
      localStorage.setItem("jwt", responseData.data.jwt);
      
      // Redirección basada en rol
      if (responseData.data.role === "ADMIN") {
        userData.navigate("/admin");
      } else if (responseData.data.role === "SALON_OWNER") {
        userData.navigate("/salon-dashboard");
      } else {
        userData.navigate("/");
      }
    }

    dispatch({ type: LOGIN_SUCCESS, payload: responseData });
  } catch (error) {
    console.log("login error:", error);
    const errorMessage = error.response?.data?.message || error.message;
    dispatch({ type: LOGIN_FAILURE, payload: errorMessage });
  }
};

export const getUser = (token) => async (dispatch) => {
  if (!token) return;
  
  dispatch({ type: GET_USER_REQUEST });
  
  try {
    const response = await axios.get(`${API_BASE_URL}/api/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    console.log("get user response:", response.data);
    const user = response.data;
    dispatch({ type: GET_USER_SUCCESS, payload: user });
  } catch (error) {
    console.log("get user error:", error);
    dispatch({ type: GET_USER_FAILURE, payload: error.response?.data?.message || error.message });
    
    // Si el token es inválido, limpiar el localStorage
    if (error.response?.status === 401 || error.response?.status === 403) {
      localStorage.removeItem("jwt");
    }
  }
};

export const logout = () => {
  return async (dispatch) => {
    dispatch({ type: LOGOUT });
    localStorage.clear();
  };
};  