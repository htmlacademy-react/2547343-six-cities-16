import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { FavoriteStateType } from '../types';
import { OfferType } from '../../types';
import { logoutAction } from '../../services/api-actions';

export const favoriteState: FavoriteStateType = {
  favorite: [],
  isFavoriteLoading: false,
  userNameLoadedFor: null,
};

export const favoriteSlice = createSlice({
  name: 'favorite',
  initialState: favoriteState,
  reducers: {
    setFavorite: (state, action: PayloadAction<OfferType[]>) => {
      state.favorite = action.payload;
    },
    setFavoriteLoadingStatus: (state, action: PayloadAction<boolean>) => {
      state.isFavoriteLoading = action.payload;
    },
    setUserNameLoadedFor: (state, action: PayloadAction<string | null>) => {
      state.userNameLoadedFor = action.payload;
    },
    toggleFavoriteProperty: (state, action: PayloadAction<OfferType>) => {
      if (state.favorite.length > 0) {
        const item = state.favorite.find((element) => element.id === action.payload.id);
        if (item !== undefined) {
          state.favorite = state.favorite.filter((element) => element.id !== action.payload.id);
        } else {
          state.favorite.push(action.payload);
        }
      } else {
        state.favorite.push(action.payload);
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
      });
  }
});

export const {
  setFavorite,
  setFavoriteLoadingStatus,
  setUserNameLoadedFor,
  toggleFavoriteProperty
} = favoriteSlice.actions;

export const {
  selectFavorite,
  selectFavoriteLoadingStatus,
  selectUserNameLoadedFor
} = favoriteSlice.selectors;

