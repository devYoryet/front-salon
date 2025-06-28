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
import api, { API_BASE_URL } from "../../config/api";

export const registerUser = (userData) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });
  console.log("auth action - ", userData);
  
  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/signup`,
      userData.userData
    );
    
    console.log("register response:", response.data);
    
    // Ajustar según la estructura de respuesta del backend
    const user = response.data;
    if (user.success && user.data?.jwt) {
      localStorage.setItem("jwt", user.data.jwt);
      userData.navigate("/");
    }
    
    dispatch({ type: REGISTER_SUCCESS, payload: user });
  } catch (error) {
    console.log("register error:", error);
    dispatch({ type: REGISTER_FAILURE, payload: error.response?.data || error.message });
  }
};

export const loginUser = (userData) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  
  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/login`,
      userData.data
    );
    
    console.log("login response:", response.data);
    
    const user = response.data;
    
    // Ajustar según la estructura real del backend
    if (user.success && user.data?.jwt) {
      localStorage.setItem("jwt", user.data.jwt);
      
      // Redirección basada en rol
      if (user.data.role === "ADMIN") {
        userData.navigate("/admin");
      } else if (user.data.role === "SALON_OWNER") {
        userData.navigate("/salon-dashboard");
      } else {
        userData.navigate("/");
      }
    }

    dispatch({ type: LOGIN_SUCCESS, payload: user });
  } catch (error) {
    console.log("login error:", error);
    dispatch({ type: LOGIN_FAILURE, payload: error.response?.data || error.message });
  }
};

export const getUser = (token) => async (dispatch) => {
  if (!token) return;
  
  dispatch({ type: GET_USER_REQUEST });
  
  try {
    const response = await api.get(`/api/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    console.log("get user response:", response.data);
    const user = response.data;
    dispatch({ type: GET_USER_SUCCESS, payload: user });
  } catch (error) {
    console.log("get user error:", error);
    dispatch({ type: GET_USER_FAILURE, payload: error.response?.data || error.message });
    // Si el token es inválido, limpiar el localStorage
    if (error.response?.status === 401 || error.response?.status === 400) {
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