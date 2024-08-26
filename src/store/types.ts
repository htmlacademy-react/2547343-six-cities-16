import { AuthorizationStatus } from '../constants';
import { CommentType, OfferInDetailType, OfferLoadingStatus, OfferType, SortingType } from '../types';

export type AuthorizationType = {
  authorizationStatus: AuthorizationStatus;
  userEmail: string | null;
}


export type OffersStateType = {
  offers: OfferType[];
  isOffersLoading: boolean;
  sortingMode: SortingType;
}

export type OfferStateType = {
  offer: OfferInDetailType | null;
  isOfferLoading: OfferLoadingStatus;
  nearbyOffers: OfferType[];
  comments: CommentType[];
}

export type ErrorType = {
  error: string | null;
}

export type CityStateType = {
  city: string;
}

export type FavoriteStateType = {
  favorite: OfferType[];
  isFavoriteLoading: boolean;
}

export type StateType =
  OffersStateType
  | OfferStateType
  | AuthorizationType
  | ErrorType
  | CityStateType;
