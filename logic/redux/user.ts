import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ArrayTrips, Trip } from '../Types/trip';

type User = {
  recommendedTrips: ArrayTrips;
  trips: ArrayTrips;
};

const initialState: User = {
  recommendedTrips: [],
  trips: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    evenUser: (state, action: PayloadAction<ArrayTrips>) => {
      state.trips = action.payload;
    },
    pushUser: (state, action: PayloadAction<Trip>) => {
      state.trips.push(action.payload);
    },
    removeUser: (state, action: PayloadAction<String>) => {
      state.trips = state.trips.filter((item) => item.id !== action.payload);
    },
    recommendedEven: (state, action: PayloadAction<ArrayTrips>) => {
      state.trips = action.payload;
    },
    recommendedPush: (state, action: PayloadAction<Trip>) => {
      state.trips.push(action.payload);
    },
  },
});

export const {
  evenUser,
  pushUser,
  recommendedEven,
  recommendedPush,
  removeUser,
} = userSlice.actions;

export default userSlice.reducer;
