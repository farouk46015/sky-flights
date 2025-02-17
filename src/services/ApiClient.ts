import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import type {
  ApiConfig,
  ApiNamespace,
  ApiResponse,
  RequestInterceptor,
  ResponseInterceptor,
  ExtendedAxiosRequestConfig,
  ApiVersion,
} from "@/types/api";
import { ApiErrorHandler, createQueryString } from "@/utils/apiUtils";

export class ApiClient {
  private static instance: ApiClient;
  private axiosInstance: AxiosInstance;
  private currentNamespace: ApiNamespace | null = "flights";
  private currentVersion: ApiVersion;
  private config: ApiConfig;

  constructor(config: ApiConfig) {
    this.config = config;
    this.currentVersion = config.defaultVersion || "v1";
    this.axiosInstance = axios.create({
      baseURL: config.baseURL,
      timeout: config.timeout || 30000,
      headers: {
        "Content-Type": "application/json",
        "x-rapidapi-key": config.apiKey,
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.axiosInstance.interceptors.request.use(
      (config) => {
        config.params = {
          ...config.params,
          _t: new Date().getTime(),
        };
        return config;
      },
      (error) => Promise.reject(ApiErrorHandler.handle(error))
    );

    this.axiosInstance.interceptors.response.use(
      (response) => {
        this.transformResponse(response);
        return response;
      },
      async (error) => {
        if (this.shouldRetry(error)) {
          return this.retryRequest(error.config);
        }
        throw ApiErrorHandler.handle(error);
      }
    );
  }

  private shouldRetry(error: any): boolean {
    const { config, response } = error;
    const retryAttempts = this.config.retryAttempts || 3;

    return (
      config?.retryCount < retryAttempts &&
      (!response || response.status >= 500)
    );
  }

  private async retryRequest(config: ExtendedAxiosRequestConfig): Promise<any> {
    config.retryCount = (config.retryCount || 0) + 1;
    const delay = (this.config.retryDelay || 1000) * config.retryCount;

    await new Promise((resolve) => setTimeout(resolve, delay));
    return this.axiosInstance(config);
  }

  private transformResponse(response: AxiosResponse): ApiResponse {
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    };
  }

  public setNamespace(namespace: ApiNamespace | null): ApiClient {
    this.currentNamespace = namespace;
    return this;
  }

  public setVersion(version: ApiVersion): ApiClient {
    this.currentVersion = version;
    return this;
  }

  private getVersionedUrl(endpoint: string): string {
    const namespacedUrl = this.currentNamespace
      ? `${this.currentNamespace}/${endpoint}`
      : endpoint;
    return `${this.currentVersion}/${namespacedUrl}`.replace(/\/+/g, "/");
  }

  public async request<T>(config: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const versionedUrl = this.getVersionedUrl(config.url || "");
    return this.axiosInstance({
      ...config,
      url: versionedUrl,
    });
  }

  // Helper methods for versions
  public v1() {
    return this.setVersion("v1");
  }

  public v2() {
    return this.setVersion("v2");
  }

  public main() {
    return this.setNamespace(null);
  }

  public flights() {
    return this.setNamespace("flights");
  }

  public static initialize(config: ApiConfig): void {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient(config);
    }
  }

  public static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      throw new Error("ApiClient not initialized");
    }
    return ApiClient.instance;
  }
}

// Initialize with default version
const config: ApiConfig = {
  baseURL: import.meta.env.VITE_API_BASE_URL,
  apiKey: import.meta.env.VITE_API_RAPIDAPI_KEY,
  defaultVersion: "v1",
  timeout: 30000,
  retryAttempts: 3,
  retryDelay: 1000,
};

ApiClient.initialize(config);
export const api = ApiClient.getInstance();
