import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosError } from 'axios';
import { getToken } from './token';
import { store } from '../store';
import { setError } from '../store/slices/error-slice';

const BASE_URL = 'https://16.design.htmlacademy.pro/six-cities';

type DetailMessageType = {
  type: string;
  message: string;
}

const processErrorHandle = (message: string): void => {
  store.dispatch(setError(message));
};


export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
  });

  api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = getToken();

    if (token && config.headers) {
      config.headers['x-token'] = token;
    }

    return config;
  },
  );

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<DetailMessageType>) => {
      if (error.response) {
        const detailMessage = (error.response.data);
        processErrorHandle(detailMessage.message);
      }

      throw error;
    }
  );

  return api;
};

