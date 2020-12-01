export interface Coords {
  lat: number;
  lon: number;
}

export interface Coords2 {
  lat: number;
  lng: number;
}

export interface Address {
  name: string;
  localadmin: string;
  coords: Coords;
}

export interface DigitransitAddress {
  name: string;
  localadmin: string;
  coords: {
    lat: string;
    lon: string;
  };
}

export interface ItinaryDetails {
  distance: number;
  emissions: number;
  duration: number;
}

export interface RouteResults {
  date: number;
  results: {
    [key: string]: ItinaryDetails;
  };
}

export interface RentalBikeStation {
  lat: number | string;
  lon: number | string;
  bikesAvailable: number;
}
