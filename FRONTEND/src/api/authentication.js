import axios from "./axios.js";

export const loginRequest = data => axios.post('/login', data);

export const logoutRequest = () => axios.post('/logout');

export const validateToken = () => axios.get('/verify');
