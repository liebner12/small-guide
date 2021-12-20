import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FullTrip } from '../Types/createTrip';

type TripMain = {
  name: string;
  desc: string;
  tags: Array<string>;
};

type TripPlace = {
  place: string;
  image: string;
};

export interface TripState {
  main: TripMain;
  place: TripPlace;
  trip: FullTrip;
  edit: string;
}

const initialState: TripState = {
  main: {
    name: '',
    desc: '',
    tags: [],
  },
  place: {
    place: '',
    image: '',
  },
  trip: [{ value: 0, places: [], gmapsUrl: '' }],
  edit: '',
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
    edit: (state, action: PayloadAction<string>) => {
      state.edit = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { main, tripPlan, place, edit } = createTripSlice.actions;

export default createTripSlice.reducer;
