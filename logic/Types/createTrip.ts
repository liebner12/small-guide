export type Cords = {
  lat: number;
  lng: number;
};

export type Place = {
  id: number;
  title: string;
  desc: string;
  img: string;
  cords: Cords;
  placeId: string;
};

export type Trip = {
  value: Number;
  places: Array<Place>;
  gmapsUrl: string;
};

export type FullTrip = Array<Trip>;
export type GoogleMaps = {
  mapInstance: any;
  mapApi: any;
};
