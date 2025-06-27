import axios from 'axios';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL_V1,
  withCredentials: true,
});

api.interceptors.request.use(config => {
  const token = Cookies.get('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});


api.interceptors.response.use(
  response => response,
  error => {
    const status     = error?.response?.status;
    const requestUrl = error?.config?.url;
    const backendMsg = error?.response?.data?.error;

    if ((status === 401 || status === 403) && requestUrl !== '/users/login') {
      localStorage.removeItem('user');
      Cookies.remove('token');
      window.location.replace('/login');
      return Promise.reject(error);
    }

    if (backendMsg) {
      toast.error(backendMsg);
    } else {
      toast.error('Erro inesperado');
    }

    return Promise.reject(error);
  }
);
