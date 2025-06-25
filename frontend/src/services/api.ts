import axios from 'axios';

const getToken = () => 
  typeof window !== 'undefined' ? localStorage.getItem('token') : null;

const redirectToLogin = () => {
  localStorage.removeItem('token');
  window.location.replace('/login');
};

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL_V1,
});


api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const requestUrl = error?.config?.url;

    if ((status === 401 || status === 403) && requestUrl !== '/users/login') {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
       redirectToLogin()
      }
    }

    return Promise.reject(error);
  }
);
