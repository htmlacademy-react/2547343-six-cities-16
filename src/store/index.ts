import { OfferType } from '../types';
import { PayloadAction, createSlice, configureStore } from '@reduxjs/toolkit';
import { createAPI } from '../services/api';

type stateType = {
  city: string;
  offers: OfferType[];
}

const initialState: stateType = {
  city: 'Paris',
  offers: [],
};


export const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    setCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
    setOffers: (state, action: PayloadAction<OfferType[]>) => {
      state.offers = action.payload;
    },
  }
});


export const { setCity, setOffers } = offersSlice.actions;
export const selectCity = (state: stateType) => state.city;
export const selectOffers = (state: stateType) => state.offers;

export const api = createAPI();

export const store = configureStore({
  reducer: {
    [offersSlice.name]: offersSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
