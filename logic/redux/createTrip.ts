import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { emptyTrip } from '../constants';
import { FullTrip } from '../Types/createTrip';
import { Trip, TripCategorie } from '../Types/trip';

type TripMain = {
  name: string;
  desc: string;
  tags: Array<string>;
  category: TripCategorie;
};

type TripPlace = {
  place: string;
  image: string;
};

export interface TripState {
  main: TripMain;
  place: TripPlace;
  trip: FullTrip;
  edit: Trip;
}

const initialState: TripState = {
  main: {
    name: '',
    desc: '',
    tags: [],
    category: 'City',
  },
  place: {
    place: '',
    image: '',
  },
  trip: [{ value: 0, places: [], gmapsUrl: '' }],
  edit: emptyTrip,
};

export const createTripSlice = createSlice({
  name: 'tripCreate',
  initialState,
  reducers: {
    main: (state, action: PayloadAction<TripMain>) => {
      state.main = action.payload;
    },
    tripPlan: (state, action: PayloadAction<FullTrip>) => {
      state.trip = action.payload;
    },
    place: (state, action: PayloadAction<TripPlace>) => {
      state.place = action.payload;
    },
    edit: (state, action: PayloadAction<Trip>) => {
      state.edit = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { main, tripPlan, place, edit } = createTripSlice.actions;

export default createTripSlice.reducer;
