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

export type OfferType = {
  id: string;
  title: string;
  type: string;
  price: number;
  priviewImage: string;
  city: {
    name: string;
    location: {
      latitude: number;
      longitude: number;
      zoom: number;
    };
  };
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
