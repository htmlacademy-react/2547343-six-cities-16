import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { OfferType } from '../../types';
import { OfferStateType } from '../types';

export const offerState: OfferStateType = {
  offers: [],
  isOfferLoading: false,
};

export const offersSlice = createSlice({
  name: 'offers',
  initialState: offerState,
  reducers: {
    setOffers: (state, action: PayloadAction<OfferType[]>) => {
      state.offers = action.payload;
    },
    setOffersLoadingStatus: (state, action: PayloadAction<boolean>) => {
      state.isOfferLoading = action.payload;
    },
  },
  selectors: {
    selectOffers: (state) => state.offers,
    selectOffersLoadingStatus: (state) => state.isOfferLoading,
  },
});

export const { setOffers, setOffersLoadingStatus } = offersSlice.actions;

export const { selectOffers, selectOffersLoadingStatus } = offersSlice.selectors;

