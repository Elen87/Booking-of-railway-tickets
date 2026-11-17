// src/types/index.ts
export interface City {
  _id: string;
  name: string;
}

export interface StationInfo {
  datetime: number;
  railway_station_name: string;
  city: City;
}

export interface PriceInfo {
  top_price: number;
  bottom_price: number;
  side_price: number;
  price?: number;
}

export interface SeatsInfo {
  first?: number;
  second?: number;
  third?: number;
  fourth?: number;
}

export interface RouteDepartureArrival {
  have_first_class: boolean;
  have_second_class: boolean;
  have_third_class: boolean;
  have_fourth_class: boolean;
  have_wifi: boolean;
  have_air_conditioning: boolean;
  is_express: boolean;
  min_price: number;
  train: {
    _id: string;
    name: string;
  };
  from: StationInfo;
  to: StationInfo;
  duration: number;
  price_info: {
    first?: PriceInfo;
    second?: PriceInfo;
    third?: PriceInfo;
    fourth?: PriceInfo;
  };
  seats_info: SeatsInfo;
  _id: string; // ID направления (добавлено для выбора мест)
}

export interface Route {
  have_first_class: boolean;
  have_second_class: boolean;
  have_third_class: boolean;
  have_fourth_class: boolean;
  have_wifi: boolean;
  have_air_conditioning: boolean;
  is_express: boolean;
  min_price: number;
  total_avaliable_seats: number; 
  departure: RouteDepartureArrival;
  arrival: RouteDepartureArrival;
}

export interface Seat {
  index: number;
  available: boolean;
}

export interface Coach {
  _id: string;
  name: string;
  class_type: string;
  have_first_class: boolean;
  have_second_class: boolean;
  have_third_class: boolean;
  have_fourth_class: boolean;
  have_wifi: boolean;
  have_air_conditioning: boolean;
  have_express: boolean;
  price: number;
  top_price: number;
  bottom_price: number;
  side_price: number;
  linens_price: number;
  wifi_price: number;
  avaliable_seats: number;
  is_linens_included: boolean;
  seats: Seat[];
}