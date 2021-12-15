import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ArrayTrips, Trip } from '../Types/trip';

type User = {
  createdTrips: Array<String>;
  trips: ArrayTrips;
};

const initialState: User = {
  createdTrips: [],
  trips: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userSaved: (state, action: PayloadAction<ArrayTrips>) => {
      state.trips = action.payload;
    },
    userCreated: (state, action: PayloadAction<Array<String>>) => {
      state.createdTrips = action.payload;
    },
    pushSaved: (state, action: PayloadAction<Trip>) => {
      state.trips.push(action.payload);
    },
    pushCreated: (state, action: PayloadAction<String>) => {
      state.createdTrips.push(action.payload);
    },
    removeSaved: (state, action: PayloadAction<String>) => {
      state.trips = state.trips.filter((item) => item.id !== action.payload);
    },
    removeCreated: (state, action: PayloadAction<String>) => {
      state.createdTrips = state.createdTrips.filter(
        (item) => item !== action.payload
      );
    },
  },
});

export const {
  userSaved,
  userCreated,
  pushCreated,
  pushSaved,
  removeSaved,
  removeCreated,
} = userSlice.actions;

export default userSlice.reducer;
