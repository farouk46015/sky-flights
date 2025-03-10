import { type AxiosError } from 'axios';
import type { ApiError, ApiErrorMessage } from '@flights/types/api';

export class ApiErrorHandler {
  static handle(error: AxiosError): ApiError {
    const apiError: ApiError = {
      name: 'ApiError',
      message: error.message,
      isAxiosError: true,
    };

    if (error.response) {
      apiError.status = error.response.status;
      apiError.data = error.response.data;
      apiError.headers = error.response.headers;
    }

    switch (apiError.status) {
      case 401:
        apiError.code = 'UNAUTHORIZED';
        break;
      case 403:
        apiError.code = 'FORBIDDEN';
        break;
      case 404:
        apiError.code = 'NOT_FOUND';
        break;
      case 429:
        apiError.code = 'RATE_LIMIT';
        break;
      default:
        apiError.code = 'UNKNOWN';
    }

    return apiError;
  }
}

export const formatErrorMessage = (message: ApiErrorMessage[] | string): string => {
  if (typeof message === 'string') return message;

  return message
    .map((errorObj) =>
      Object.entries(errorObj)
        .map(([field, error]) => `${field}: ${error}`)
        .join(', ')
    )
    .join('\n');
};
