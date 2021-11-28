import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ArrayTrips, Trip } from '../Types/trip';

const initialState: ArrayTrips = [];

export const tripSlice = createSlice({
  name: 'trip',
  initialState,
  reducers: {
    even: (state, action: PayloadAction<ArrayTrips>) => {
      state = action.payload;
    },
    push: (state, action: PayloadAction<Trip>) => {
      state.push(action.payload);
    },
  },
});

export const { even, push } = tripSlice.actions;

export default tripSlice.reducer;
