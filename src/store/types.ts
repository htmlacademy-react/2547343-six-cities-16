import { AuthorizationStatus } from '../constants';
import { OfferType } from '../types';

export type AuthorizationType = {
  authorizationStatus: AuthorizationStatus;
  userEmail: string | null;
}

export type OfferStateType = {
  offers: OfferType[];
  isOfferLoading: boolean;
}

export type ErrorType = {
  error: string | null;
}

export type CityStateType = {
  city: string;
}

export type StateType =
  OfferStateType
  | AuthorizationType
  | ErrorType
  | CityStateType;
