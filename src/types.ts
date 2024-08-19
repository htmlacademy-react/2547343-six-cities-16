export type CityLocationType = {
  name: string;
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
}

export type OfferType = {
  id: string;
  title: string;
  type: string;
  price: number;
  previewImage: string;
  city: CityLocationType;
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
}
export type FavoriteOffer = {
  id: string;
  title: string;
  city: string;
  price: string;
  rating: number;
  type: string;
  isPremium: boolean;
}
export type FavoritesDataType = {
  city: string;
  offers: FavoriteOffer[];
};

export type CityDataType = {
  id: string;
  location: CityLocationType;
}

export type ReviewItemType = {
  id: string;
  name: string;
  rating: string;
  text: string;
  dateTime: string;
  dateLabel: string;
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
