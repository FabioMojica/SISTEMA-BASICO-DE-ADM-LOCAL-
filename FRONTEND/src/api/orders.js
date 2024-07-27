import axios from './axios.js';
import { API } from '../conf/routeApi.js'

export const getSalesRequest = () => axios.get(`${API}/orders`);

export const addSaleRequest = (data) => axios.post(`${API}/orders/addOrder`, data); 

export const getSaleRequest = id => axios.get(`${API}/orders/${id}`);

export const putSaleRequest = (id, data) => axios.put(`${API}/orders/${id}`, data);

export const deleteSaleRequest = id => axios.delete(`${API}/orders/${id}`, id);