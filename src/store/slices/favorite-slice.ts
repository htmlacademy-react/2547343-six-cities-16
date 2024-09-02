import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { FavoriteStateType } from '../types';
import { OfferType } from '../../types';
import { fetchFavoriteAction, logoutAction } from '../../services/api-actions';

export const favoriteState: FavoriteStateType = {
  favorite: [],
  isFavoriteLoading: false,
  userNameLoadedFor: null,
};

export const favoriteSlice = createSlice({
  name: 'favorite',
  initialState: favoriteState,
  reducers: {
    setUserNameLoadedFor: (state, action: PayloadAction<string | null>) => {
      state.userNameLoadedFor = action.payload;
    },
    toggleFavoriteProperty: (state, action: PayloadAction<OfferType>) => {
      if (action.payload.isFavorite) {
        state.favorite.push(action.payload);
      } else {
        state.favorite = state.favorite.filter((element) => element.id !== action.payload.id);
      }
    }
  },
  selectors: {
    selectFavorite: (state) => state.favorite,
    selectFavoriteLoadingStatus: (state) => state.isFavoriteLoading,
    selectUserNameLoadedFor: (state) => state.userNameLoadedFor,
  },
  extraReducers: (builder) => {
    builder
      .addCase(logoutAction.fulfilled, (state) => {
        state.favorite = [];
        state.userNameLoadedFor = null;
      })
      .addCase(fetchFavoriteAction.pending, (state) => {
        state.isFavoriteLoading = true;
      })
      .addCase(fetchFavoriteAction.fulfilled, (state, action) => {
        state.isFavoriteLoading = false;
        state.favorite = action.payload;
      })
      .addCase(fetchFavoriteAction.rejected, (state) => {
        state.isFavoriteLoading = false;
      });
  }
});

export const {
  setUserNameLoadedFor,
  toggleFavoriteProperty
} = favoriteSlice.actions;

export const {
  selectFavorite,
  selectFavoriteLoadingStatus,
  selectUserNameLoadedFor
} = favoriteSlice.selectors;

