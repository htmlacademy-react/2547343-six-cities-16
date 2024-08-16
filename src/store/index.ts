import { OfferType } from '../types';
import { PayloadAction, createSlice, configureStore } from '@reduxjs/toolkit';
import { createAPI } from '../services/api';

type stateType = {
  city: string;
  offers: OfferType[];
  isOfferLoading: boolean;
}

const initialState: stateType = {
  city: 'Paris',
  offers: [],
  isOfferLoading: false,
};

// разбила слайсы на 3 отдельных потому что когда они были в одном,
// при таком createStor'e появлялась обертка над selectOffers
// и приходилось писать что-то вроде => state.offers.offers,
// хотелось бы хотябы offersSlice и isOfferLoadingSlice слить в один
// но там тоже всякие ошибки начинают появляться

export const offersSlice = createSlice({
  name: 'offers',
  initialState: initialState.offers,
  reducers: {
    setOffers: (_, action: PayloadAction<OfferType[]>) => action.payload
  }
});

export const isOfferLoadingSlice = createSlice({
  name: 'isOfferLoaded',
  initialState: initialState.isOfferLoading,
  reducers: {
    setOffersLoadingStatus: (_, action: PayloadAction<boolean>) => action.payload
  }
});

export const citySlice = createSlice({
  name: 'city',
  initialState: initialState.city,
  reducers: {
    setCity: (_, action: PayloadAction<string>) => action.payload
  }
});

export const { setOffers } = offersSlice.actions;
export const { setOffersLoadingStatus } = isOfferLoadingSlice.actions;
export const { setCity } = citySlice.actions;

export const selectCity = (state: stateType) => state.city;
export const selectOffers = (state: stateType) => state.offers;
export const selectOffersLoadingStatus = (state: stateType) => state.isOfferLoading;

export const api = createAPI();

export const store = configureStore({
  reducer: {
    [offersSlice.name]: offersSlice.reducer,
    [isOfferLoadingSlice.name]: isOfferLoadingSlice.reducer,
    [citySlice.name]: citySlice.reducer,
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
