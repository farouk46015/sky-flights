import type { ReactNode } from 'react';

export interface FlightSelectProps {
  prefix: ReactNode | null;
  type: 'from' | 'to';
  placeholder?: string;
}

export interface SearchApiResponse {
  status: boolean;
  timestamp: number;
  data: SearchResult[];
}

export interface NearByApiResponse {
  status: boolean;
  timestamp: number;
  data: {
    current?: SearchResult;
    nearby?: SearchResult[];
  };
}

export interface SearchResult {
  skyId: string;
  entityId: string;
  presentation: Presentation;
  navigation: Navigation;
}

export interface Presentation {
  title: string;
  suggestionTitle: string;
  subtitle: string;
}

export interface Navigation {
  entityId: string;
  entityType: string;
  localizedName: string;
  relevantFlightParams: RelevantParams;
  relevantHotelParams: RelevantParams;
}

export interface RelevantParams {
  skyId?: string;
  entityId: string;
  flightPlaceType?: string;
  entityType?: string;
  localizedName: string;
}

export interface FlightSelectProps {
  prefix: ReactNode | null;
  type: 'from' | 'to';
  placeholder?: string;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Nearby {
  presentation: Presentation;
  navigation: Navigation;
}

export interface Location {
  current: {
    skyId: string;
    entityId: string;
    presentation: Presentation;
    navigation: Navigation;
    entityType: string;
    relevantFlightParams: RelevantParams;
  };
  nearby: Array<Nearby | null>;
  recent: unknown[];
}

export interface FlightSearchParams {
  originSkyId: string;
  destinationSkyId: string;
  originEntityId: string;
  destinationEntityId: string;
  date: string;
  returnDate?: string;
  cabinClass?: 'economy' | 'premium_economy' | 'business' | 'first';
  adults?: number;
  childrens?: number;
  infants?: number;
  sortBy?:
    | 'best'
    | 'price_high'
    | 'fastest'
    | 'outbound_take_off_time'
    | 'outbound_landing_time'
    | 'return_take_off_time'
    | 'return_landing_time';
}

export interface Airport {
  id: string;
  entityId: string;
  name: string;
  displayCode: string;
  city: string;
  country: string;
  isHighlighted: boolean;
}

export interface Price {
  raw: number;
  formatted: string;
  pricingOptionId: string;
}

export interface Carrier {
  id: number;
  alternateId: string;
  logoUrl: string;
  name: string;
}

export interface FarePolicy {
  isChangeAllowed: boolean;
  isPartiallyChangeable: boolean;
  isCancellationAllowed: boolean;
  isPartiallyRefundable: boolean;
}

export interface FlightPlace {
  flightPlaceId: string;
  displayCode: string;
  parent: {
    flightPlaceId: string;
    displayCode: string;
    name: string;
    type: string;
  };
  name: string;
  type: string;
  country: string;
}

export interface CarrierInfo {
  id: number;
  name: string;
  alternateId: string;
  allianceId: number;
  displayCode: string;
}

export interface Carriers {
  marketing: Carrier[];
  operationType: string;
}

export interface Context {
  status: string;
  sessionId: string;
  totalResults: number;
}

export interface FlightAccordionCardProps {
  itinerary: Itinerary;
}

export interface FlightResult {
  context: Context;
  itineraries: Itinerary[];
  messages: unknown[];
  filterStats: FilterStats;
  flightsSessionId: string;
  destinationImageUrl: string;
}

export interface Itinerary {
  id: string;
  price: Price;
  legs: Leg[];
  isSelfTransfer: boolean;
  isProtectedSelfTransfer: boolean;
  farePolicy: FarePolicy;
  fareAttributes: Record<string, unknown>;
  tags: string[];
  isMashUp: boolean;
  hasFlexibleOptions: boolean;
  score: number;
}

export interface Leg {
  id: string;
  origin: Airport;
  destination: Airport;
  durationInMinutes: number;
  stopCount: number;
  isSmallestStops: boolean;
  departure: string;
  arrival: string;
  timeDeltaInDays: number;
  carriers: {
    marketing: Carrier[];
    operationType: string;
  };
  segments: Segment[];
}

export interface Segment {
  id: string;
  origin: FlightPlace;
  destination: FlightPlace;
  departure: string;
  arrival: string;
  durationInMinutes: number;
  flightNumber: string;
  marketingCarrier: CarrierInfo;
  operatingCarrier: CarrierInfo;
}

export interface FilterStats {
  duration: {
    min: number;
    max: number;
    multiCityMin: number;
    multiCityMax: number;
  };
  airports: AirportGroup[];
  carriers: Carrier[];
  stopPrices: StopPrices;
}

export interface AirportGroup {
  city: string;
  airports: Airport[];
}

export interface StopPrices {
  direct?: StopPrice;
  one?: StopPrice;
  twoOrMore?: StopPrice;
}

export interface StopPrice {
  isPresent: boolean;
  formattedPrice?: string;
}

export interface CalendarSearchParams {
  originSkyId: string;
  destinationSkyId: string;
  fromDate: string;
  toDate?: string;
}

export interface DatePrice {
  day: string;
  price: number;
  group: 'low' | 'medium' | 'high';
}

export interface PriceGroup {
  low: number[];
  medium: number[];
  high: number[];
}

type FlightGroup = {
  id: string;
  label: string;
};

export type FlightDay = {
  day: string;
  group: 'low' | 'medium' | 'high';
  price: number;
};

type FlightsData = {
  noPriceLabel: string;
  groups: FlightGroup[];
  days: FlightDay[];
  currency: string;
};

export type FlightResponse = {
  data: { flights: FlightsData };
  status: boolean;
};

export interface FlightResultsContextType {
  result: FlightResult | null;
  isLoading: boolean;
  error: string | null;
  searchFlights: () => Promise<void>;
  clearResults: () => void;
}
