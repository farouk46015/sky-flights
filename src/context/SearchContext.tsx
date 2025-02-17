import React, { createContext, useContext, useState, ReactNode } from "react";
import { ROUND_TRIP, FLIGHT_CLASS } from "@utils/constraints";
import type { PassengersCount } from "@/types/Passenger";

interface UserLocatioon {
  skyId?: string;
  entityId?: string;
}

interface SearchContextType {
  roundTrip: (typeof ROUND_TRIP)[0];
  setRoundTrip: (trip: (typeof ROUND_TRIP)[0]) => void;
  flightClass: (typeof FLIGHT_CLASS)[0];
  setFlightClass: (className: (typeof FLIGHT_CLASS)[0]) => void;
  passengers: PassengersCount;
  setPassengers: (passengers: PassengersCount) => void;
  fromLocation: UserLocatioon | undefined;
  setFromLocation: (location: UserLocatioon) => void;
  toLocation: UserLocatioon | undefined;
  setToLocation: (location: UserLocatioon) => void;
  dateRange: [Date | null, Date | null];
  setDateRange: (dates: [Date | null, Date | null]) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [roundTrip, setRoundTrip] = useState(ROUND_TRIP[0]);
  const [flightClass, setFlightClass] = useState(FLIGHT_CLASS[0]);
  const [passengers, setPassengers] = useState<PassengersCount>({
    adults: 1,
    childrens: 0,
    infants: 0,
  });
  const [fromLocation, setFromLocation] = useState<UserLocatioon | undefined>(
    undefined
  );
  const [toLocation, setToLocation] = useState<UserLocatioon | undefined>(
    undefined
  );
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);

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
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};
