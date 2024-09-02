import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../store';
import { OfferType, AuthData, UserData, OfferInDetailType, CommentType, CommentToSendType } from '../types';
import { APIRoute } from '../constants';
import { toggleFavoriteInOffers } from '../store/slices/offers-slice';
import { saveToken, dropToken } from './token';
import { toggleFavoriteInOffer } from '../store/slices/offer-slice';
import { toggleFavoriteProperty } from '../store/slices/favorite-slice';


type AsyncThunkType = {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
};

type OfferToToggleDataType = {
  id: string;
  status: 0 | 1;
}

export const fetchOffersAction = createAsyncThunk<OfferType[], undefined, AsyncThunkType>(
  '/six-cities/offers',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<OfferType[]>(APIRoute.Offers);
    return data;
  },
);

export const fetchOfferAction = createAsyncThunk<OfferInDetailType, string | undefined, AsyncThunkType>(
  '/six-cities/offer/id',
  async (id, { extra: api }) => {
    const { data } = await api.get<OfferInDetailType>(`${APIRoute.Offer}${id}`);
    return data;
  },
);

export const fetchNearbyOffersAction = createAsyncThunk<OfferType[], string | undefined, AsyncThunkType>(
  '/six-cities/offers/id/nearby',
  async (id, { extra: api }) => {
    const { data } = await api.get<OfferType[]>(`${APIRoute.Offer}${id}/nearby`);
    return data;
  },
);

export const fetchFavoriteAction = createAsyncThunk<OfferType[], undefined, AsyncThunkType>(
  '/six-cities/favorite',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<OfferType[]>(APIRoute.Favorite);
    return data;
  },
);

export const toggleFavoriteAction = createAsyncThunk<void, OfferToToggleDataType, AsyncThunkType>(
  '/six-cities/favorite/offer/status',
  async ({ id, status }, { extra: api, dispatch }) => {
    const { data } = await api.post<OfferInDetailType>(`${APIRoute.Favorite}/${id}/${status}`);

    dispatch(toggleFavoriteInOffers(data.id));
    dispatch(toggleFavoriteInOffer(data.id));
    dispatch(toggleFavoriteProperty(data));
  },
);

export const fetchCommentsAction = createAsyncThunk<CommentType[], string | undefined, AsyncThunkType>(
  '/six-cities/comments/get',
  async (id, { extra: api }) => {
    const { data } = await api.get<CommentType[]>(`${APIRoute.Comments}${id}`);
    return data;
  },
);

export const postCommentAction = createAsyncThunk<void, CommentToSendType, AsyncThunkType>(
  '/six-cities/comments/post',
  async ({ id, comment, rating }, { dispatch, extra: api }) => {
    await api.post<CommentToSendType[]>(`${APIRoute.Comments}${id}`, { comment, rating });
    dispatch(fetchCommentsAction(id));
  },
);

export const checkAuthAction = createAsyncThunk<string | null, undefined, AsyncThunkType>(
  'user/checkAuth',
  async (_arg, { extra: api }) => {
    const { data: { email } } = await api.get<UserData>(APIRoute.Login);
    return email ?? null;
  }
);

export const loginAction = createAsyncThunk<string, AuthData, AsyncThunkType>(
  'user/login',
  async ({ email, password }, { extra: api }) => {
    const { data: { token } } = await api.post<UserData>(APIRoute.Login, { email, password });
    saveToken(token);
    return email;
  },
);

export const logoutAction = createAsyncThunk<void, undefined, AsyncThunkType>(
  'user/logout',
  async (_arg, { extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  },
);
