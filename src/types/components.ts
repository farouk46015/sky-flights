import type { ReactNode } from 'react';
import type { Dayjs } from 'dayjs';
import type { PassengerType, PassengersCount } from '@flights/types/passenger';

export interface FlightSelectProps {
  prefix: ReactNode | null;
  type: 'from' | 'to';
  placeholder?: string;
}

export interface DateRangeCellProps {
  current: string | number | Dayjs;
  info: { type: string; originNode: ReactNode };
  priceInfo?: { price: number; group: string };
  priceCurrency: string;
  isSelected: boolean;
}

export interface PassengerCounterDropdownProps {
  passengers: PassengersCount;
  onPassengerUpdate: (type: PassengerType['type'], increment: boolean) => void;
}
