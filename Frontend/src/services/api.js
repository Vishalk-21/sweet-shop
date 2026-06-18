import axios from 'axios'
import { useStore } from '../store/store'

// Create axios instance with base URL
const apiBaseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

const api = axios.create({
    baseURL: apiBaseURL,
    withCredentials: true
})

// Add token to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, (error) => Promise.reject(error))

// Handle response errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Unauthorized - logout user
            useStore.setState({ isLoggedIn: false, user: null, token: null })
            localStorage.removeItem('authToken')
            localStorage.removeItem('user')
        }
        return Promise.reject(error)
    }
)

// Auth APIs
export const authAPI = {
    register: (data) => api.post('/auth/register', data),
    login: (data) => api.post('/auth/login', data),
    logout: () => api.post('/auth/logout'),
    getProfile: () => api.get('/auth/profile')
}

// Product APIs
export const productAPI = {
    getAllProducts: (params) => api.get('/products', { params }),
    getAdminProducts: () => api.get('/admin/products'),
    getProduct: (id) => api.get(`/products/${id}`),
    createProduct: (data) => {
        const config = data instanceof FormData ? { headers: { 'Content-Type': 'multipart/form-data' } } : {}
        return api.post('/admin/products', data, config)
    },
    updateProduct: (id, data) => {
        const config = data instanceof FormData ? { headers: { 'Content-Type': 'multipart/form-data' } } : {}
        return api.put(`/admin/products/${id}`, data, config)
    },
    deleteProduct: (id) => api.delete(`/admin/products/${id}`)
}

// Order APIs
export const orderAPI = {
    createOrder: (data) => api.post('/orders', data),
    getMyOrders: () => api.get('/orders/my'),
    getOrderById: (id) => api.get(`/orders/${id}`),
    getAllOrders: () => api.get('/admin/orders'),
    updateOrderStatus: (id, status) => api.put(`/admin/orders/${id}/status`, { status }),
    getDashboardStats: () => api.get('/admin/dashboard/stats')
}

// Message APIs
export const messageAPI = {
    createMessage: (data) => api.post('/messages', data),
    getAllMessages: () => api.get('/admin/messages'),
    getMessageById: (id) => api.get(`/admin/messages/${id}`),
    updateMessageStatus: (id, status) => api.put(`/admin/messages/${id}/status`, { status }),
    deleteMessage: (id) => api.delete(`/admin/messages/${id}`),
    getMessageStats: () => api.get('/admin/messages/stats')
}

export default api
