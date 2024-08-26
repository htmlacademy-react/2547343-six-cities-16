import { configureStore } from '@reduxjs/toolkit';
import { createAPI } from '../services/api';
import { offersSlice } from './slices/offers-slice';
import { citySlice } from './slices/city-slice';
import { authorizationSlice } from './slices/authorization-slice';
import { errorSlice } from './slices/error-slice';
import { offerSlice } from './slices/offer-slice';
import { favoriteSlice } from './slices/favorite-slice';

export const api = createAPI();

export const store = configureStore({
  reducer: {
    [offersSlice.name]: offersSlice.reducer,
    [offerSlice.name]: offerSlice.reducer,
    [citySlice.name]: citySlice.reducer,
    [authorizationSlice.name]: authorizationSlice.reducer,
    [errorSlice.name]: errorSlice.reducer,
    [favoriteSlice.name]: favoriteSlice.reducer,
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
