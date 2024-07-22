import { FavoritesDataType } from '../types';

export const favoritesMocks: FavoritesDataType[] = [
  {
    city: 'Amsterdam',
    offers: [{
      id: '015',
      name: 'Nice, cozy, warm big bed apartment',
      price: '180',
      rating: '5',
      type: 'Apartment',
      premium: 'true'
    },
    {
      id: '012',
      name: 'Wood and stone place',
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
      price: '€180',
      rating: '5',
      type: 'Apartment',
      premium: 'false'
    }]
  },
];
