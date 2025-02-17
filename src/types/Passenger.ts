export interface PassengerType {
  type: "adults" | "childrens" | "infants";
  text: string;
  description: string;
}

export interface PassengersCount {
  adults: number;
  childrens: number;
  infants: number;
}
