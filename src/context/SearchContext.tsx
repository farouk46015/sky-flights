import { createContext, useState, type ReactNode } from 'react';
import type { UserLocatioon, SearchContextType } from '@flights/types/search';
import type { PassengersCount } from '@flights/types/passenger';
import { ROUND_TRIP, FLIGHT_CLASS } from '@utils/constraints';

const SearchContext = createContext<SearchContextType | undefined>(undefined);

function SearchProvider({ children }: { children: ReactNode }) {
  const [roundTrip, setRoundTrip] = useState(ROUND_TRIP[0]);
  const [flightClass, setFlightClass] = useState(FLIGHT_CLASS[0]);
  const [passengers, setPassengers] = useState<PassengersCount>({
    adults: 1,
    childrens: 0,
    infants: 0,
  });
  const [fromLocation, setFromLocation] = useState<UserLocatioon | undefined>(undefined);
  const [toLocation, setToLocation] = useState<UserLocatioon | undefined>(undefined);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);

  return (
    <SearchContext.Provider
      value={{
        roundTrip,
        setRoundTrip,
        flightClass,
        setFlightClass,
        passengers,
        setPassengers,
        fromLocation,
        setFromLocation,
        toLocation,
        setToLocation,
        dateRange,
        setDateRange,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export { SearchContext };

export default SearchProvider;
