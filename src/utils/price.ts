import type { FlightDay } from '@flights/types/flight';

export function getPriceMap(datePrice: FlightDay[]) {
  return datePrice.reduce(
    (acc, { day, price, group }) => {
      acc[day] = { price, group };
      return acc;
    },
    {} as Record<string, { price: number; group: string }>
  );
}

export function formatPrice(price: number, currency: string) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function getPriceColor(group: string) {
  switch (group) {
    case 'low':
      return '#4CAF50';
    case 'medium':
      return '#FF9800';
    case 'high':
      return '#F44336';
    default:
      return '#666';
  }
}
