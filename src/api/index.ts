import { ServerResponse } from '@/types/serverResponse';
import { getAccessToken, isErrorCase, removeAccessToken } from '@/utils/acceessToken';
import axios, { AxiosError } from 'axios';
import { reTakeToken } from './Auth';
import { notFoundGroupDetail } from './Error';

export const BASE_URL = process.env.REACT_APP_SERVER_URL;

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const accessToken = getAccessToken();
  if (config.headers && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

let lock = false;

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (notFoundGroupDetail(error)) {
      return (window.location.href = '/not-found');
    }

    const { config, response } = error;
    if (response?.status === 401) {
      if (isErrorCase(response.data.status.code)) {
        removeAccessToken();
        window.location.href = process.env.REACT_APP_SERVICE_URL as string;
      }
      if (!lock) {
        if (response?.data.status.code === 1204) {
          lock = true;
          await reTakeToken();
          lock = false;
          return;
        }
      }
    }
    return Promise.reject(error);
  },
);

export default api;
