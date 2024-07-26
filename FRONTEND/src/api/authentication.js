import axios from "./axios.js";

export const loginRequest = data => axios.post('/login', data);

export const logoutRequest = () => axios.post('/logout');

export const validateTokenRequest = data => axios.get('/verify', data);

export const validatePasswordRequest = user => axios.post('/verifyPassword', user);