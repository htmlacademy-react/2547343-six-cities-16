export type OfferCardType = {
  id: string;
  name: string;
  price: string;
  rating: string;
  type: string;
  premium: string;
};

export type FavoritesDataType = {
  city: string;
  offers: OfferCardType[];
};
