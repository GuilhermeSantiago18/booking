import axios from 'axios';

const redirectToLogin = () => {
  localStorage.removeItem('user');
  window.location.replace('/login');
};

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL_V1,
  withCredentials: true, 
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const requestUrl = error?.config?.url;

    if ((status === 401 || status === 403) && requestUrl !== '/users/login') {
      if (typeof window !== 'undefined') {
        redirectToLogin();
      }
    }

    return Promise.reject(error);
  }
);
