import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE,
  // Si quieres enviar credenciales/cookies en el futuro:
  // withCredentials: true,
});

export default api;
