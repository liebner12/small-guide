import { Trip, TripCategoriesArray } from './Types/trip';

export const tripsCategories: TripCategoriesArray = [
  'City',
  'Rural',
  'Sea',
  'Tropical',
  'Mountain',
];

export const emptyTrip: Trip = {
  id: '',
  saved: 0,
  author: '',
  category: 'City',
  desc: '',
  image: '',
  name: '',
  place: '',
  tags: [''],
  userName: '',
  timeStamp: '',
  trip: [],
};
