import { TripCategorie, ArrayTrips } from './Types/trip';

export const getKeyValue = (key: string) => (obj: Record<string, any>) =>
  obj[key];

export const getFilteredTrip = (array: ArrayTrips, category: TripCategorie) => {
  return array.filter((trip) => trip.category === category);
};
