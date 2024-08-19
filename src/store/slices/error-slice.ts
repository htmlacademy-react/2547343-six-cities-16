import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ErrorType } from '../types';

export const errorState: ErrorType = {
  error: null,
};

export const errorSlice = createSlice({
  name: 'error',
  initialState: errorState.error,
  reducers: {
    setError: (_, action: PayloadAction<string>) => action.payload
  }
});

export const { setError } = errorSlice.actions;
export const selectError = (state: ErrorType) => state.error;

