import { useContext } from 'react';
import { FlightResultsContext } from '@context/FlightResultsContext';

const useFlightResults = () => {
  const context = useContext(FlightResultsContext);
  if (context === undefined) {
    throw new Error('useFlightResults must be used within a FlightResultsProvider');
  }
  return context;
};

export default useFlightResults;
