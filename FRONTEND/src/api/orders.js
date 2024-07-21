import axios from './axios.js';
import { API } from '../conf/routeApi.js'

export const addSaleRequest = (data) => axios.post(`${API}/orders/addOrder`, data); 