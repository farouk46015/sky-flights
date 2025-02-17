import { useSearch } from "@/context/SearchContext";

export const useFlightClass = () => {
  const { flightClass, setFlightClass } = useSearch();
  return { flightClass, setFlightClass };
};

export const useRoundTrip = () => {
  const { roundTrip, setRoundTrip } = useSearch();
  return { roundTrip, setRoundTrip };
};

export const useDateRange = () => {
  const { dateRange, setDateRange } = useSearch();
  return { dateRange, setDateRange };
};

export const useLocations = () => {
  const { fromLocation, setFromLocation, toLocation, setToLocation } =
    useSearch();
  return { fromLocation, setFromLocation, toLocation, setToLocation };
};
