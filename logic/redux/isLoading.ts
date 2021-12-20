import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  loading: true,
};

export const isLoading = createSlice({
  name: 'isLoading',
  initialState,
  reducers: {
    loading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { loading } = isLoading.actions;

export default isLoading.reducer;
