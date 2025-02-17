import type { ApiResponse } from '@flights/types/api';
import type { Coordinates, FlightSearchParams, CalendarSearchParams } from '@flights/types/flight';
import { api } from '../ApiClient';

export interface ApiErrorResponse {
  status: false;
  message: Array<{ [key: string]: string }> | string;
}

export const flightsApi = {
  searchAirports: async (query: string) => {
    const locale = localStorage.getItem('userLocale') || 'en-US';
    try {
      const response = await api
        .v1() // or .v2() for v2 endpoints
        .flights()
        .request({
          method: 'GET',
          url: 'searchAirport',
          params: { query, locale },
        });

      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  getNearByAirports: async <T = unknown>(params: Coordinates) => {
    const locale = localStorage.getItem('userLocale') || 'en-US';
    try {
      const response = await api.flights().request({
        method: 'GET',
        url: 'getNearByAirports',
        params: { ...params, locale: locale },
      });
      return response.data as Promise<T>;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  searchFlights: async (params: FlightSearchParams): Promise<ApiResponse | ApiErrorResponse> => {
    const currency = localStorage.getItem('userCurrency') || 'USD';
    let country = localStorage.getItem('userCountry');
    country = country ? country.split('__')[0] : 'US';
    const market = country ? country.split('__')[1] : 'en-US';
    try {
      const response = await api.flights().request({
        method: 'GET',
        url: 'searchFlights',
        params: {
          ...params,
          currency: currency,
          market: market,
          countryCode: country,
        },
      });

      return response.data as ApiResponse;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response?.data) {
        return error.response.data as ApiErrorResponse;
      }
      throw error;
    }
  },
  searchFlightsV2: async (params: FlightSearchParams): Promise<ApiResponse | ApiErrorResponse> => {
    try {
      const response = await api.v2().flights().request({
        method: 'GET',
        url: 'searchFlights',
        params,
      });

      return response.data as ApiResponse;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response?.data) {
        return error.response.data as ApiErrorResponse;
      }
      throw error;
    }
  },
  getPriceCalendar: async (params: CalendarSearchParams) => {
    try {
      const currency = localStorage.getItem('userCurrency') || 'USD';
      const response = await api.flights().request({
        method: 'GET',
        url: 'getPriceCalendar',
        params: { ...params, currency },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};
