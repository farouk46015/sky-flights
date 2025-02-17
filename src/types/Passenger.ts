export interface PassengerType {
  type: 'adults' | 'childrens' | 'infants';
  text: string;
  description: string;
}

export interface PassengersCount {
  adults: number;
  childrens: number;
  infants: number;
}

export interface PassengerCounterItemProps {
  passenger: PassengerType;
  passengers: PassengersCount;
  onPassengerUpdate: (type: PassengerType['type'], increment: boolean) => void;
}
