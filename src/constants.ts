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

export enum APIRoute {
  Offers = '/offers',
  Login = '/login',
  Logout = '/logout'
}
// Это оверкилл, но если я меняю на объект, то в main.tsx на 27 строчке
// у линтера начинается истерика и я пока не знаю что с ней делать

// export const CITIES_NAME_MAP = {
//   'paris': 'Paris',
//   'cologne': 'Cologne',
//   'brussels': 'Brussels',
//   'amsterdam': 'Amsterdam',
//   'hamburg': 'Hamburg',
//   'dusseldorf': 'Dusseldorf'
// };

export const CITIES_NAME_MAP = new Map([
  ['paris', 'Paris'],
  ['cologne', 'Cologne'],
  ['brussels', 'Brussels'],
  ['amsterdam', 'Amsterdam'],
  ['hamburg', 'Hamburg'],
  ['dusseldorf', 'Dusseldorf']
]);
