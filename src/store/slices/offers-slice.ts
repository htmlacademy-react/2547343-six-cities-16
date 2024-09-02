import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { SortingType } from '../../types';
import { OffersStateType } from '../types';
import { fetchOffersAction } from '../../services/api-actions';
import { LoadingStatus } from '../../constants';

export const offersState: OffersStateType = {
  offers: [],
  isOffersLoading: LoadingStatus.NotLoaded,
  sortingMode: {
    name: 'Popular',
    value: 'Popular'
  }
};

export const offersSlice = createSlice({
  name: 'offers',
  initialState: offersState,
  reducers: {
    setSortingMode: (state, action: PayloadAction<SortingType>) => {
      state.sortingMode = action.payload;
    },
    toggleFavoriteInOffers: (state, action: PayloadAction<string>) => {
      const offer = state.offers.find((item) => item.id === action.payload);
      if (offer) {
        offer.isFavorite = !offer?.isFavorite;
      }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isOffersLoading = LoadingStatus.Loading;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isOffersLoading = LoadingStatus.Loaded;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isOffersLoading = LoadingStatus.LoadingError;
      });
  },
  selectors: {
    selectOffers: (state) => state.offers,
    selectOffersLoadingStatus: (state) => state.isOffersLoading,
    selectSortingMode: (state) => state.sortingMode,
  },
});

export const {
  setSortingMode,
  toggleFavoriteInOffers
} = offersSlice.actions;

export const {
  selectOffers,
  selectOffersLoadingStatus,
  selectSortingMode,
} = offersSlice.selectors;

