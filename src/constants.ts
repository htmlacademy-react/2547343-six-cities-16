import { SortingType } from './types';

export enum AppRoute {
  Main = '/',
  MainWithParams = '/:city',
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

export enum LoadingStatus {
  NotLoaded = 'notLoaded',
  Loading = 'loading',
  Loaded = 'loaded',
  LoadingError = 'loadingError'
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

export const citiesData = {
  cities: [
    { id: 'paris', name: 'Paris' },
    { id: 'cologne', name: 'Cologne' },
    { id: 'brussels', name: 'Brussels' },
    { id: 'amsterdam', name: 'Amsterdam' },
    { id: 'hamburg', name: 'Hamburg' },
    { id: 'dusseldorf', name: 'Dusseldorf' }]
  ,
  hasNavigation: true
};

export const ratingArray = [
  {
    title: 'perfect',
    value: 5
  },
  {
    title: 'good',
    value: 4
  },
  {
    title: 'not bad',
    value: 3
  },
  {
    title: 'badly',
    value: 2
  },
  {
    title: 'terribly',
    value: 1
  },
];

export const defaultCitiesCoordinates = [
  {
    id: 'paris',
    location: {
      name: 'Paris',
      lat: 48.856663,
      lng: 2.351556,
      zoom: 12
    }
  }, {
    id: 'cologne',
    location: {
      name: 'Cologne',
      lat: 50.930779,
      lng: 6.938399,
      zoom: 12
    }
  }, {
    id:
      'brussels',
    location: {
      name: 'Brussels',
      lat: 50.854283,
      lng: 4.352131,
      zoom: 12
    }
  }, {
    id:
      'amsterdam',
    location: {
      name: 'Amsterdam',
      lat: 52.368179,
      lng: 4.904084,
      zoom: 12
    }
  }, {
    id:
      'hamburg',
    location: {
      name: 'Hamburg',
      lat: 53.567103,
      lng: 9.941934,
      zoom: 12
    }
  }, {
    id:
      'dusseldorf',
    location: {
      name: 'Dusseldorf',
      lat: 51.230569,
      lng: 6.787428,
      zoom: 12
    }
  },];

export const defaultCityCoordinates = {
  name: 'Paris',
  location: {
    latitude: 48.85661,
    longitude: 2.351499,
    zoom: 13
  }
};
