import axios from './axios.js'
import { API } from '../conf/routeApi.js'

export const getProductsRequest = () => axios.get(`${API}/products`);

export const addProductRequest = product => axios.post(`${API}/products`, product);