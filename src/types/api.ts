import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

export type ApiNamespace = "flights" | "hotels" | "cars" | "houses";
export type ApiVersion = "v1" | "v2";

export interface ApiConfig extends AxiosRequestConfig {
  baseURL: string;
  apiKey: string;
  defaultVersion?: ApiVersion;
  timeout?: number;
  retryAttempts?: number;
  retryDelay?: number;
}

export interface ExtendedAxiosRequestConfig extends AxiosRequestConfig {
  retryCount?: number;
}

export interface ApiResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: any;
}

export interface ApiError extends Error {
  code?: string;
  status?: number;
  response?: AxiosResponse;
  config?: AxiosRequestConfig;
  isAxiosError: boolean;
  data?: any;
  headers?: any;
}

export interface RequestInterceptor {
  onRequest?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  onRequestError?: (error: AxiosError) => Promise<never>;
}

export interface ResponseInterceptor {
  onResponse?: (response: AxiosResponse) => AxiosResponse;
  onResponseError?: (error: AxiosError) => Promise<never>;
}

export interface ApiErrorMessage {
  [key: string]: string;
}

export interface ApiErrorResponse {
  status: false;
  message: ApiErrorMessage[] | string;
}
