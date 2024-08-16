import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, RootState, setOffersLoadingStatus } from '../store';
import { OfferType } from '../types';
import { APIRoute } from '../constants';
import { setOffers } from '../store';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  '/six-cities/offers',
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setOffersLoadingStatus(true));
    const { data } = await api.get<OfferType[]>(APIRoute.Offers);
    dispatch(setOffers(data));
    dispatch(setOffersLoadingStatus(false));
  },
);

