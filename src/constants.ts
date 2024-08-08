export enum AppRoute {
  Main = '/:city?',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

export enum MapType {
  Main = 'main',
  Offer = 'offer'
}

export const URL_MARKER_DEFAULT =
  '../public/img/pin.svg';

export const URL_MARKER_ACTIVE =
  '../public/img/pin-active.svg';

export const DEFAULT_CITY = {
  name: 'Paris',
  value: 'paris'
};

