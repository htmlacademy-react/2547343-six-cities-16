import { FavoritesDataType } from '../types';

export const favoritesMocks: FavoritesDataType[] = [
  {
    city: 'Amsterdam',
    offers: [{
      id: '015',
      title: 'Nice, cozy, warm big bed apartment',
      city: 'Amsterdam',
      price: '180',
      rating: 5,
      type: 'Apartment',
      isPremium: true
    },
    {
      id: '012',
      title: 'Wood and stone place',
      city: 'Amsterdam',
      price: '€80',
      rating: 4,
      type: 'Room',
      isPremium: false
    }]
  },
  {
    city: 'Cologne',
    offers: [{
      id: '011',
      title: 'White castle',
      city: 'Cologne',
      price: '€180',
      rating: 5,
      type: 'Apartment',
      isPremium: false
    }]
  },
];
