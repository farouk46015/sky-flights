import type { FlightSearchParams, CalendarSearchParams } from '../types/flight';
import { toast } from 'react-toastify';

export const validateSearchParams = (params: Partial<FlightSearchParams>): boolean => {
  const requiredFields = [
    { field: 'originSkyId', label: 'Origin Airport' },
    { field: 'destinationSkyId', label: 'Destination Airport' },
    { field: 'originEntityId', label: 'Origin' },
    { field: 'destinationEntityId', label: 'Destination' },
    { field: 'date', label: 'Departure Date' },
  ];

  const missingFields = requiredFields.filter(
    ({ field }) => !params[field as keyof FlightSearchParams]
  );

  if (missingFields.length > 0) {
    const missingFieldLabels = missingFields.map((f) => f.label).join(', ');
    toast.error(`Please fill in all required fields: ${missingFieldLabels}`, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    return false;
  }

  return true;
};

export const validateCalendarSearchParams = (params: Partial<CalendarSearchParams>): boolean => {
  const requiredFields = [
    { field: 'originSkyId', label: 'Origin Airport' },
    { field: 'destinationSkyId', label: 'Destination Airport' },
    { field: 'fromDate', label: 'Departure Date' },
  ];

  const missingFields = requiredFields.filter(
    ({ field }) => !params[field as keyof CalendarSearchParams]
  );

  if (missingFields.length > 0) {
    return false;
  }

  return true;
};
