import { OfferCardType } from '../types';
import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';

type stateType = {
  city: string;
  offers: OfferCardType[];
}

const initialState: stateType = {
  city: '',
  offers: [],
};

export const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    setCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
    setOffers: (state, action: PayloadAction<OfferCardType[]>) => {
      state.offers = action.payload;
    },
  }
});

export const { setCity, setOffers } = offersSlice.actions;
export const selectCity = (state: stateType) => state.city;
export const selectOffers = (state: stateType) => state.offers;

export const store = configureStore(offersSlice);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
