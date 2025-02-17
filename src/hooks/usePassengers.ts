import { useCallback, useMemo } from 'react';
import useSearch from '@hooks/useSearch';
import type { PassengerType, PassengersCount } from '@flights/types/passenger';

interface ValidationResult {
  isValid: boolean;
  message?: string;
}

export const usePassengers = () => {
  const { passengers, setPassengers } = useSearch();

  const validatePassengerUpdate = useCallback(
    (type: PassengerType['type'], newCount: number): ValidationResult => {
      const totalPassengers =
        Object.values(passengers).reduce((sum, count) => sum + count, 0) +
        (newCount - passengers[type]);

      if (totalPassengers > 9) {
        return {
          isValid: false,
          message: 'Maximum 9 passengers allowed',
        };
      }

      if (type === 'adults') {
        if (newCount < 1) {
          return {
            isValid: false,
            message: 'At least 1 adult is required',
          };
        }
        if (newCount < passengers.infants) {
          return {
            isValid: false,
            message: 'Number of adults cannot be less than number of infants',
          };
        }
      }

      return { isValid: true };
    },
    [passengers]
  );

  const updatePassenger = useCallback(
    (type: PassengerType['type'], increment: boolean): ValidationResult => {
      const newCount = increment ? passengers[type] + 1 : passengers[type] - 1;
      const validation = validatePassengerUpdate(type, newCount);

      if (validation.isValid) {
        setPassengers({
          ...passengers,
          [type]: newCount,
        } as PassengersCount);
      }

      return validation;
    },
    [passengers, setPassengers, validatePassengerUpdate]
  );

  const totalPassengers = useMemo(
    () => Object.values(passengers).reduce((sum, count) => sum + count, 0),
    [passengers]
  );

  const getPassengerSummary = useMemo(() => {
    const summary = [];
    if (passengers.adults)
      summary.push(`${passengers.adults} Adult${passengers.adults > 1 ? 's' : ''}`);
    if (passengers.childrens)
      summary.push(`${passengers.childrens} Child${passengers.childrens > 1 ? 'ren' : ''}`);
    if (passengers.infants)
      summary.push(`${passengers.infants} Infant${passengers.infants > 1 ? 's' : ''}`);
    return summary.join(', ');
  }, [passengers]);

  return {
    passengers,
    updatePassenger,
    totalPassengers,
    getPassengerSummary,
    isMaxPassengers: totalPassengers >= 9,
  };
};
