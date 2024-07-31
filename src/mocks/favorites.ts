import { FavoritesDataType } from '../types';

export const favoritesMocks: FavoritesDataType[] = [
  {
    city: 'Amsterdam',
    offers: [{
      id: '015',
      name: 'Nice, cozy, warm big bed apartment',
      city: 'amstrdam',
      price: '180',
      rating: '5',
      type: 'Apartment',
      premium: 'true'
    },
    {
      id: '012',
      name: 'Wood and stone place',
      city: 'amstrdam',
      price: '€80',
      rating: '4',
      type: 'Room',
      premium: 'false'
    }]
  },
  {
    city: 'Cologne',
    offers: [{
      id: '011',
      name: 'White castle',
      city: 'cologne',
      price: '€180',
      rating: '5',
      type: 'Apartment',
      premium: 'false'
    }]
  },
];
