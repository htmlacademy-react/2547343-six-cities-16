import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ErrorType } from '../types';

export const errorState: ErrorType = {
  error: null,
};

export const errorSlice = createSlice({
  name: 'error',
  initialState: errorState,
  reducers: {
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    }
  },
  selectors: {
    selectError: (state) => state.error,
  }
});

export const { setError } = errorSlice.actions;

export const { selectError } = errorSlice.selectors;

