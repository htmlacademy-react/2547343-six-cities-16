import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { OfferStateType } from '../types';
import { fetchCommentsAction, fetchNearbyOffersAction, fetchOfferAction } from '../../services/api-actions';
import { LoadingStatus } from '../../constants';

export const offerState: OfferStateType = {
  offer: null,
  isOfferLoading: LoadingStatus.NotLoaded,
  nearbyOffers: [],
  comments: []
};

export const offerSlice = createSlice({
  name: 'offer',
  initialState: offerState,
  reducers: {
    toggleFavoriteInOffer: (state, action: PayloadAction<string>) => {
      if (state.offer?.id === action.payload) {
        state.offer.isFavorite = !state.offer.isFavorite;
      }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOfferAction.pending, (state) => {
        state.isOfferLoading = LoadingStatus.Loading;
      })
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        state.offer = action.payload;
        state.isOfferLoading = LoadingStatus.Loaded;
      })
      .addCase(fetchOfferAction.rejected, (state) => {
        state.isOfferLoading = LoadingStatus.LoadingError;
      })
      .addCase(fetchCommentsAction.fulfilled, (state, action) => {
        state.comments = action.payload;
      })
      .addCase(fetchNearbyOffersAction.fulfilled, (state, action) => {
        state.nearbyOffers = action.payload;
      });
  },
  selectors: {
    selectOffer: (state) => state.offer,
    selectOfferLoadingStatus: (state) => state.isOfferLoading,
    selectNearbyOffers: (state) => state.nearbyOffers,
    selectComments: (state) => state.comments,
  }
});

export const {
  toggleFavoriteInOffer
} = offerSlice.actions;

export const {
  selectOffer,
  selectOfferLoadingStatus,
  selectNearbyOffers,
  selectComments
} = offerSlice.selectors;

