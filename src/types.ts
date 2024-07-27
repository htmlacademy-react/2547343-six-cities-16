export type OfferCardType = {
  id: string;
  name: string;
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

export type MapDataType = {
  name: string;
  lat: number;
  lng: number;
  zoom: number;
}
