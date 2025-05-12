import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to attach auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth APIs
export const login = async (email: string, password: string) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    // Store the token immediately after successful login
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  } catch (error: any) {
    // Extract the most specific error message available
    const errorMessage = 
      error.response?.data?.message || // Backend error message
      error.response?.data?.error || // Alternative backend error field
      error.message || // Axios error message
      'An unexpected error occurred during login'; // Fallback message
    
    console.error('Login error:', {
      message: errorMessage,
      status: error.response?.status,
      data: error.response?.data
    });
    
    throw errorMessage;
  }
};

export const register = async (name: string, email: string, password: string) => {
  try {
    const response = await api.post('/auth/register', { name, email, password });
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || 'Failed to register';
    console.error('Register error:', message);
    throw message;
  }
};

export const updateProfile = async (userData: any) => {
  try {
    const response = await api.put('/users/profile', userData);
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || 'Failed to update profile';
    console.error('Update profile error:', message);
    throw message;
  }
};

// Product APIs
export const getProducts = async (params?: any) => {
  const response = await api.get('/products', { params });
  return response.data;
};

export const getProduct = async (id: string) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const createProductReview = async (productId: string, review: any) => {
  const response = await api.post(`/products/${productId}/reviews`, review);
  return response.data;
};

// Cart APIs
export const getCart = async () => {
  const response = await api.get('/cart');
  return response.data;
};

export const addToCart = async (productId: string, quantity: number) => {
  const response = await api.post('/cart', { productId, quantity });
  return response.data;
};

export const updateCartItem = async (productId: string, quantity: number) => {
  const response = await api.put(`/cart/${productId}`, { quantity });
  return response.data;
};

export const removeFromCart = async (productId: string) => {
  const response = await api.delete(`/cart/${productId}`);
  return response.data;
};

export const clearCart = async () => {
  const response = await api.delete('/cart');
  return response.data;
};

// Order APIs
export const createOrder = async (orderData: any) => {
  const response = await api.post('/orders', orderData);
  return response.data;
};

export const getOrder = async (id: string) => {
  const response = await api.get(`/orders/${id}`);
  return response.data;
};

export const getMyOrders = async () => {
  const response = await api.get('/orders/myorders');
  return response.data;
};

export const updateOrderToPaid = async (orderId: string) => {
  const response = await api.put(`/orders/${orderId}/pay`);
  return response.data;
};

// Error handler
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || error.message;
    return Promise.reject(message);
  }
);

export default api;