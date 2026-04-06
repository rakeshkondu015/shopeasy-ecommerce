import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8080/api',
});

// Attach JWT token to every request if present
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ── Auth ──────────────────────────────────────────────
export const register = (data) => API.post('/auth/register', data);
export const login    = (data) => API.post('/auth/login', data);

// ── Products (public) ─────────────────────────────────
export const getAllProducts   = ()         => API.get('/products/all');
export const getProductById   = (id)       => API.get(`/products/${id}`);
export const searchProducts   = (name)     => API.get(`/products/search?name=${name}`);
export const getByCategory    = (category) => API.get(`/products/category/${category}`);

// ── Admin – Product CRUD ──────────────────────────────
export const createProduct = (data) => API.post('/admin/products', data);
export const updateProduct = (id, data) => API.put(`/admin/products/${id}`, data);
export const deleteProduct = (id) => API.delete(`/admin/products/${id}`);

// ── Admin – Users ──────────────────────────────────────
export const getAllUsers  = ()   => API.get('/admin/users');
export const deleteUser  = (id) => API.delete(`/admin/users/${id}`);

// ── Cart ──────────────────────────────────────────────
export const getCart        = ()                      => API.get('/cart');
export const addToCart      = (productId, quantity)   => API.post('/cart/add', { productId, quantity });
export const updateCartItem = (cartItemId, quantity)  => API.put(`/cart/${cartItemId}`, { quantity });
export const removeCartItem = (cartItemId)            => API.delete(`/cart/${cartItemId}`);
export const clearCart      = ()                      => API.delete('/cart/clear');
