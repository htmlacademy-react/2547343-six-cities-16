import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CommentType, OfferInDetailType, OfferLoadingStatus, OfferType } from '../../types';
import { OfferStateType } from '../types';

export const offerState: OfferStateType = {
  offer: null,
  isOfferLoading: 'notLoaded',
  nearbyOffers: [],
  comments: []
};

export const offerSlice = createSlice({
  name: 'offer',
  initialState: offerState,
  reducers: {
    setOffer: (state, action: PayloadAction<OfferInDetailType>) => {
      state.offer = action.payload;
    },
    setOfferLoadingStatus: (state, action: PayloadAction<OfferLoadingStatus>) => {
      state.isOfferLoading = action.payload;
    },
    setNearbyOffers: (state, action: PayloadAction<OfferType[]>) => {
      state.nearbyOffers = action.payload;
    },
    setComments: (state, action: PayloadAction<CommentType[]>) => {
      state.comments = action.payload;
    },
    toggleFavoriteInOffer: (state) => {
      if (state.offer !== null) {
        state.offer = { ...state.offer, isFavorite: !state.offer.isFavorite };
      }
    }
  },
  selectors: {
    selectOffer: (state) => state.offer,
    selectOfferLoadingStatus: (state) => state.isOfferLoading,
    selectNearbyOffers: (state) => state.nearbyOffers,
    selectComments: (state) => state.comments,
  },
});

export const {
  setOffer,
  setOfferLoadingStatus,
  setNearbyOffers,
  setComments,
  toggleFavoriteInOffer
} = offerSlice.actions;

export const {
  selectOffer,
  selectOfferLoadingStatus,
  selectNearbyOffers,
  selectComments
} = offerSlice.selectors;

