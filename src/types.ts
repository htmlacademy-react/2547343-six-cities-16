export type OfferCardType = {
  id: string;
  name: string;
  city: string;
  price: string;
  rating: string;
  type: string;
  premium: string;
  lat?: number;
  lng?: number;
};

export type FavoritesDataType = {
  city: string;
  offers: OfferCardType[];
};

export type CityLocationType = {
  name: string;
  lat: number;
  lng: number;
  zoom: number;
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
