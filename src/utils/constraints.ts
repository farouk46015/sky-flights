import { type PassengerType } from '@flights/types/passenger';

export const ROUND_TRIP = [
  {
    label: 'Round Trip',
    value: 'round_trip',
    icon: 'two-way',
  },
  {
    label: 'One Way',
    value: 'one_way',
    icon: 'one-way',
  },
  {
    label: 'Multi City',
    value: 'multi_city',
    icon: 'multi',
  },
];

export const FLIGHT_CLASS = [
  {
    label: 'Economy',
    value: 'economy',
  },
  {
    label: 'Premium Economy',
    value: 'premium_economy',
  },

  {
    label: 'Business',
    value: 'business',
  },
  {
    label: 'First Class',
    value: 'first',
  },
];

export const PASSENGERS: PassengerType[] = [
  {
    text: 'Adults',
    description: 'Age 13 or above',
    type: 'adults',
  },
  {
    text: 'Children',
    description: 'Age 2-12',
    type: 'childrens',
  },
  {
    text: 'Infants',
    description: 'Under 2',
    type: 'infants',
  },
];
