import { API_URL } from '@/constants.ts';
import axios, { type AxiosError, type AxiosRequestConfig } from 'axios';

export const httpRequest = async <T extends Partial<Record<keyof T, unknown>>>(
  path: string,
  options?: AxiosRequestConfig,
) => {
  let requestData: T | null = null;
  let requestError: AxiosError | Error | null = null;

  try {
    const { data } = await axios.request<T>({
      url: path,
      baseURL: API_URL,
      ...options,
    });
    requestData = data;
  } catch (error) {
    if (axios.isAxiosError(error) || error instanceof Error)
      requestError = error;
    else requestError = new Error('An unknown error occurred');
  }

  return { data: requestData, error: requestError };
};
