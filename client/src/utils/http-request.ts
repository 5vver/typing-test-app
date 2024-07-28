import axios, { type AxiosError, type AxiosRequestConfig } from "axios";

export const httpRequest = async <T extends Record<keyof T, unknown>>(
  path: string,
  options?: AxiosRequestConfig,
) => {
  let requestData: T | null = null;
  let requestError: AxiosError | Error | null = null;

  try {
    const { data } = await axios.request<T>({
      url: path,
      baseURL: "http://localhost:5000",
      ...options,
    });
    requestData = data;
  } catch (error) {
    if (axios.isAxiosError(error) || error instanceof Error)
      requestError = error;
    else requestError = new Error("An unknown error occurred");
  }
  
  console.log(requestData, requestError);

  return { data: requestData, error: requestError };
};
