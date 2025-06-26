import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL_V1,
  withCredentials: true, 
});

const redirectToLogin = () => {
  localStorage.removeItem('user');
  window.location.replace('/login');
};


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



export async function getAllRooms() {
  const response = await api.get("/rooms",);
  return response;
}


export async function getAllAppointments() {
  const response = await api.get("/appointments",);
  return response;
}

