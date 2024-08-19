import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CityStateType } from '../types';

export const cityState: CityStateType = {
  city: 'Paris',
};

export const citySlice = createSlice({
  name: 'city',
  initialState: cityState.city,
  reducers: {
    setCity: (_, action: PayloadAction<string>) => action.payload
  }
});

export const { setCity } = citySlice.actions;

export const selectCity = (state: CityStateType) => state.city;
