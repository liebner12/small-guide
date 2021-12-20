import { configureStore } from '@reduxjs/toolkit';
import createTripReducer from './createTrip';
import isLoadingReducer from './isLoading';
import tripReducer from './trip';
import userReducer from './user';

export const store = configureStore({
  reducer: {
    tripCreate: createTripReducer,
    trip: tripReducer,
    user: userReducer,
    isLoading: isLoadingReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
