import { type ROUND_TRIP, type FLIGHT_CLASS } from '@utils/constraints';
import type { PassengersCount } from '@flights/types/passenger';

export interface UserLocatioon {
  skyId?: string;
  entityId?: string;
}

export interface SearchContextType {
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
