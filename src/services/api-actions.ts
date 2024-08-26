import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../store';
import { OfferType, AuthData, UserData, OfferInDetailType, CommentType, CommentToSendType } from '../types';
import { APIRoute } from '../constants';
import { setOffers, setOffersLoadingStatus } from '../store/slices/offer-slice';
import { AuthorizationStatus } from '../constants';
import { setAuthorizationStatus } from '../store/slices/authorization-slice';
import { setUserEmail } from '../store/slices/authorization-slice';
import { saveToken, dropToken } from './token';
import { setComments, setNearbyOffers, setOffer, setOfferLoadingStatus } from '../store/slices/offer-in-detail-slice';
import { setFavoriteLoadingStatus, setFavorite } from '../store/slices/favorite-slice';


type AsyncThunkType = {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
};

type OfferToToggleDataType = {
  id: string;
  status: 0 | 1;
}

export const fetchOffersAction = createAsyncThunk<void, undefined, AsyncThunkType>(
  '/six-cities/offers',
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setOffersLoadingStatus(true));
    const { data } = await api.get<OfferType[]>(APIRoute.Offers);
    dispatch(setOffers(data));
    dispatch(setOffersLoadingStatus(false));
  },
);

export const fetchOfferInDetailAction = createAsyncThunk<void, string | undefined, AsyncThunkType>(
  '/six-cities/offers/id',
  async (id, { dispatch, extra: api }) => {
    dispatch(setOfferLoadingStatus('loading'));
    try {
      const { data } = await api.get<OfferInDetailType>(`${APIRoute.Offer}${id}`);
      dispatch(setOffer(data));
      dispatch(setOfferLoadingStatus('loaded'));
    } catch {
      dispatch(setOfferLoadingStatus('notLoaded'));
    }
  },
);

export const fetchNearbyOffersAction = createAsyncThunk<void, string | undefined, AsyncThunkType>(
  '/six-cities/offers/id/nearby',
  async (id, { dispatch, extra: api }) => {
    const { data } = await api.get<OfferType[]>(`${APIRoute.Offer}${id}/nearby`);
    dispatch(setNearbyOffers(data));
  },
);

export const fetchFavoriteAction = createAsyncThunk<void, undefined, AsyncThunkType>(
  '/six-cities/favorite',
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setFavoriteLoadingStatus(true));
    const { data } = await api.get<OfferType[]>(APIRoute.Favorite);
    dispatch(setFavorite(data));
    console.log('get favor')
    dispatch(setFavoriteLoadingStatus(false));
  },
);

export const toggleFavoriteAction = createAsyncThunk<void, OfferToToggleDataType, AsyncThunkType>(
  '/six-cities/favorite/offer/status',
  async ({ id, status }, { extra: api }) => {
    await api.post<OfferInDetailType>(`${APIRoute.Favorite}/${id}/${status}`);
  },
);

export const fetchCommentsAction = createAsyncThunk<void, string | undefined, AsyncThunkType>(
  '/six-cities/offers/id',
  async (id, { dispatch, extra: api }) => {
    const { data } = await api.get<CommentType[]>(`${APIRoute.Comments}${id}`);
    dispatch(setComments(data));
  },
);

export const postCommentAction = createAsyncThunk<void, CommentToSendType, AsyncThunkType>(
  '/six-cities/offers/id',
  async ({ id, comment, rating }, { dispatch, extra: api }) => {
    await api.post<CommentToSendType[]>(`${APIRoute.Comments}${id}`, { comment, rating });
    dispatch(fetchCommentsAction(id));
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, AsyncThunkType>(
  'user/login',
  async (_arg, { dispatch, extra: api }) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
    } catch {
      dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({ email, password }, { dispatch, extra: api }) => {
    const { data: { token } } = await api.post<UserData>(APIRoute.Login, { email, password });
    saveToken(token);
    dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
    dispatch(setUserEmail(email));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
    dispatch(setUserEmail(null));
  },
);
