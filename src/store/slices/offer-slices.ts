import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { OfferType, SortingType } from '../../types';
import { OfferStateType } from '../types';

export const offerState: OfferStateType = {
  offers: [],
  isOfferLoading: false,
  sortingMode: {
    name: 'Popular',
    value: 'Popular'
  }
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
    setSortingMode: (state, action: PayloadAction<SortingType>) => {
      state.sortingMode = action.payload;
    },
  },
  selectors: {
    selectOffers: (state) => state.offers,
    selectOffersLoadingStatus: (state) => state.isOfferLoading,
    selectSortingMode: (state) => state.sortingMode,
  },
});

export const { setOffers, setOffersLoadingStatus, setSortingMode } = offersSlice.actions;

export const { selectOffers, selectOffersLoadingStatus, selectSortingMode } = offersSlice.selectors;

