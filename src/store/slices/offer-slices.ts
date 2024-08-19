import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { OfferType } from '../../types';
import { OfferStateType } from '../types';

export const offerState: OfferStateType = {
  offers: [],
  isOfferLoading: false,
};

export const offersSlice = createSlice({
  name: 'offers',
  initialState: offerState.offers,
  reducers: {
    setOffers: (_, action: PayloadAction<OfferType[]>) => action.payload
  }
});

export const isOfferLoadingSlice = createSlice({
  name: 'isOfferLoading',
  initialState: offerState.isOfferLoading,
  reducers: {
    setOffersLoadingStatus: (_, action: PayloadAction<boolean>) => action.payload
  }
});

export const { setOffers } = offersSlice.actions;
export const { setOffersLoadingStatus } = isOfferLoadingSlice.actions;

export const selectOffers = (state: OfferStateType) => state.offers;
export const selectOffersLoadingStatus = (state: OfferStateType) => state.isOfferLoading;
