import { configureStore } from '@reduxjs/toolkit';
import { createAPI } from '../services/api';
import { offersSlice } from './slices/offer-slices';
import { citySlice } from './slices/city-slice';
import { authorizationSlice } from './slices/authorization-slice';
import { errorSlice } from './slices/error-slice';
import { AuthorizationStatus } from '../constants';
import { StateType } from './types';
import { offerSlice } from './slices/offer-in-detail-slices';

export const initialState: StateType = {
  city: 'Paris',
  offers: [],
  isOfferLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  userEmail: null,
  error: null,
};

export const api = createAPI();

export const store = configureStore({
  reducer: {
    [offersSlice.name]: offersSlice.reducer,
    [offerSlice.name]: offerSlice.reducer,
    [citySlice.name]: citySlice.reducer,
    [authorizationSlice.name]: authorizationSlice.reducer,
    [errorSlice.name]: errorSlice.reducer,
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
