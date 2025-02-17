import type {
  FlightResult,
  FlightSearchParams,
  FlightResultsContextType,
} from '@flights/types/flight';
import type { ApiErrorResponse } from '@flights/types/api';
import { createContext, useState, type ReactNode } from 'react';
import { toast } from 'react-toastify';

import { flightsApi } from '@services/api/flights';
import useSearch from '@hooks/useSearch';
import { formatErrorMessage } from '@utils/apiUtils';
import { validateSearchParams } from '@utils/validation';
import { formatDate } from '@utils/date';

const FlightResultsContext = createContext<FlightResultsContextType | undefined>(undefined);

function FlightResultsProvider({ children }: { children: ReactNode }) {
  const [result, setResult] = useState<FlightResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchContext = useSearch();

  const searchFlights = async () => {
    try {
      const { fromLocation, toLocation, dateRange, passengers, flightClass } = searchContext;

      const searchParams: Partial<FlightSearchParams> = {
        originSkyId: fromLocation?.skyId,
        destinationSkyId: toLocation?.skyId,
        originEntityId: fromLocation?.entityId,
        destinationEntityId: toLocation?.entityId,
        date: dateRange[0] ? formatDate(dateRange[0]) : '',
        returnDate: dateRange[1] ? formatDate(dateRange[1]) : '',
        cabinClass: flightClass?.value as
          | 'economy'
          | 'premium_economy'
          | 'business'
          | 'first'
          | undefined,
        adults: passengers.adults,
        childrens: passengers.childrens,
        infants: passengers.infants,
      };

      if (!validateSearchParams(searchParams)) {
        return;
      }

      setIsLoading(true);
      setError(null);

      const response = await flightsApi.searchFlightsV2(searchParams as FlightSearchParams);

      if (response.status) {
        setResult(response.data as FlightResult);
        toast.success('Flights found successfully!');
      } else {
        const errorResponse = response as ApiErrorResponse;
        const formattedError = formatErrorMessage(errorResponse.message);
        throw new Error(formattedError);
      }
    } catch (err) {
      let errorMessage: string;

      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (typeof err === 'object' && err !== null) {
        const apiError = err as Error;
        if (apiError.message && Array.isArray(apiError.message)) {
          errorMessage = formatErrorMessage(apiError.message);
        } else {
          errorMessage = 'An unexpected error occurred';
        }
      } else {
        errorMessage = 'An unexpected error occurred';
      }

      setError(errorMessage);
      toast.error(errorMessage, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: { whiteSpace: 'pre-line' },
      });
    } finally {
      setIsLoading(false);
    }
  };

  const clearResults = () => {
    setResult(null);
    setError(null);
  };

  return (
    <FlightResultsContext.Provider
      value={{
        result,
        isLoading,
        error,
        searchFlights,
        clearResults,
      }}
    >
      {children}
    </FlightResultsContext.Provider>
  );
}

export { FlightResultsContext };

export default FlightResultsProvider;
