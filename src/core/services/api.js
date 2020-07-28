import axios from 'axios';
import { getToken, login, isExpired, logout, tokenExpire } from "./auth.service";

const api = axios.create({
    baseURL: 'http://localhost:3333/',
    headers: {
      'Content-Type': 'application/json'
    }
});

api.interceptors.request.use(async config => {
  let token = getToken();

  if (token) {

    if (isExpired()) {
      logout();
      return window.location.href = '/login';
    }

    // 5 minutes from now
    const refreshThreshold = (new Date().getTime() + 300000);
    if (refreshThreshold > tokenExpire()) {

      const configAxios = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }

      const response = await axios.post('http://localhost:3333/sessions/refresh',  '', configAxios);
      login(response.data.tokenRefresh);
      token = response.data.tokenRefresh;
    }

    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
