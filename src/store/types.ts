import { AuthorizationStatus } from '../constants';
import { CommentType, OfferInDetailType, OfferType, SortingType } from '../types';

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
  isOfferLoading: boolean;
  nearbyOffers: OfferType[];
  comments: CommentType[];
}

export type ErrorType = {
  error: string | null;
}

export type CityStateType = {
  city: string;
}

export type StateType =
  OffersStateType
  | OfferStateType
  | AuthorizationType
  | ErrorType
  | CityStateType;
