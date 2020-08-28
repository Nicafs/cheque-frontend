import axios from 'axios';
import { getToken, login, isExpired, logout, tokenExpire } from "./auth.service";

const api = axios.create({
<<<<<<< HEAD
    baseURL: 'http://www.unibrasilfactory.com.br:21176/',
=======
    baseURL: 'http://localhost:21130/api',
>>>>>>> 6e33b734f7e212fa2024f40f29d59329eb9a2138
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Authorization", 
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE"
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

<<<<<<< HEAD
      const response = await axios.post('http://www.unibrasilfactory.com.br:21176/sessions/refresh',  '', configAxios);
=======
      const response = await axios.post('http://localhost:21130/api/sessions/refresh',  '', configAxios);
>>>>>>> 6e33b734f7e212fa2024f40f29d59329eb9a2138
      login(response.data.tokenRefresh);
      token = response.data.tokenRefresh;
    }

    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
