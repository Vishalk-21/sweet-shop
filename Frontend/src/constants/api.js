/**
 * API Constants
 * Central place for all API endpoints and configuration
 */

const normalizeApiBaseURL = (baseURL) => {
  const url = (baseURL || 'http://localhost:3000/api').trim().replace(/\/+$/, '');
  return url.endsWith('/api') ? url : `${url}/api`;
};

const API_BASE_URL = normalizeApiBaseURL(import.meta.env.VITE_API_URL);

export const API_ENDPOINTS = {
  // Auth
  AUTH_REGISTER: `${API_BASE_URL}/auth/register`,
  AUTH_LOGIN: `${API_BASE_URL}/auth/login`,
  AUTH_LOGOUT: `${API_BASE_URL}/auth/logout`,
  AUTH_PROFILE: `${API_BASE_URL}/auth/profile`,

  // Products
  PRODUCTS: `${API_BASE_URL}/products`,
  PRODUCT_DETAIL: (id) => `${API_BASE_URL}/products/${id}`,

  // Orders
  ORDERS: `${API_BASE_URL}/orders`,
  ORDER_DETAIL: (id) => `${API_BASE_URL}/orders/${id}`,

  // Users
  USERS: `${API_BASE_URL}/users`,
  USER_DETAIL: (id) => `${API_BASE_URL}/users/${id}`,
};

export const API_TIMEOUT = import.meta.env.VITE_API_TIMEOUT || 10000;

export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH',
};
