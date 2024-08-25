import { SortingType } from './types';

export enum AppRoute {
  Main = '/:city?',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id',
  Error = '/error'
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

export enum APIRoute {
  Offers = '/offers',
  Login = '/login',
  Logout = '/logout',
  Offer = '/offers/',
  Comments = '/comments/',
  Favorite = '/favorite'
}

export const CITIES_NAME_MAP = {
  'paris': 'Paris',
  'cologne': 'Cologne',
  'brussels': 'Brussels',
  'amsterdam': 'Amsterdam',
  'hamburg': 'Hamburg',
  'dusseldorf': 'Dusseldorf'
} as const;

export const SortingArray: SortingType[] = [
  {
    name: 'Popular',
    value: 'Popular'
  },
  {
    name: 'PriceLTH',
    value: 'Price: low to high'
  },
  {
    name: 'PriceHTL',
    value: 'Price: high to low'
  },
  {
    name: 'Rating',
    value: 'Top rated first'
  }
];
