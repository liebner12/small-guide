import { FullTrip } from './createTrip';

export type Trip = {
  id: string;
  saved: number;
  author: string;
  category: TripCategorie;
  desc: string;
  image: string;
  name: string;
  place: string;
  tags: Array<string>;
  userName: string;
  timeStamp: string;
  trip: FullTrip;
};

export type ArrayTrips = Array<Trip>;

export type TripCategorie = 'City' | 'Rural' | 'Sea' | 'Tropical' | 'Mountain';

export type TripCategoriesArray = Array<
  'City' | 'Rural' | 'Sea' | 'Tropical' | 'Mountain'
>;
