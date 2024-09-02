export type CityLocationType = {
  name: string;
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
}

export type LocationType = {
  latitude: number;
  longitude: number;
  zoom: number;
}

export type OfferType = {
  id: string;
  title: string;
  type: string;
  price: number;
  previewImage: string;
  images?: string[];
  city: CityLocationType;
  location: LocationType;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
}

export type PersonDataType = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
}

export type OfferInDetailType = {
  id: string;
  title: string;
  type: string;
  price: number;
  previewImage: string;
  city: CityLocationType;
  location: LocationType;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  description: string;
  bedrooms: number;
  goods: string[];
  host: PersonDataType;
  images: string[];
  maxAdults: number;
}

export type CityDataType = {
  id: string;
  location: CityLocationType;
}

export type AuthData = {
  email: string;
  password: string;
};

export type UserData = {
  id: number;
  email: string;
  token: string;
};

export type SortingType = {
  name: string;
  value: string;
};

export type CommentType = {
  id: string;
  date: string;
  user: PersonDataType;
  comment: string;
  rating: number;
}

export type CommentToSendType = {
  id: string;
  comment: string;
  rating: number;
}

export type OfferLoadingStatus = 'notLoaded' | 'loading' | 'loaded' | 'loadingError';

