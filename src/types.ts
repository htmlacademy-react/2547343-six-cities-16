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

export type FavoritesDataType = {
  city: string;
  offers: OfferType[];
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
