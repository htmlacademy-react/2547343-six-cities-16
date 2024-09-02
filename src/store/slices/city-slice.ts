import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CityStateType } from '../types';

export const cityState: CityStateType = {
  city: 'Paris',
};

export const citySlice = createSlice({
  name: 'city',
  initialState: cityState,
  reducers: {
    setCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    }
  },
  selectors: {
    selectCity: (state) => state.city,
  }
});

export const { setCity } = citySlice.actions;

export const { selectCity } = citySlice.selectors;

