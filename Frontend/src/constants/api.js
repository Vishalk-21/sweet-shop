/**
 * API Constants
 * Central place for all API endpoints and configuration
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const API_ENDPOINTS = {
  // Auth
  AUTH_REGISTER: `${API_BASE_URL}/v1/auth/register`,
  AUTH_LOGIN: `${API_BASE_URL}/v1/auth/login`,
  AUTH_LOGOUT: `${API_BASE_URL}/v1/auth/logout`,
  AUTH_PROFILE: `${API_BASE_URL}/v1/auth/profile`,

  // Products
  PRODUCTS: `${API_BASE_URL}/v1/products`,
  PRODUCT_DETAIL: (id) => `${API_BASE_URL}/v1/products/${id}`,

  // Orders
  ORDERS: `${API_BASE_URL}/v1/orders`,
  ORDER_DETAIL: (id) => `${API_BASE_URL}/v1/orders/${id}`,

  // Users
  USERS: `${API_BASE_URL}/v1/users`,
  USER_DETAIL: (id) => `${API_BASE_URL}/v1/users/${id}`,
};

export const API_TIMEOUT = import.meta.env.VITE_API_TIMEOUT || 10000;

export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH',
};
