/* eslint-disable @typescript-eslint/unbound-method */
import { CityLocationType, LocationType, OfferInDetailType, OfferType, PersonDataType } from '../types';
import { lorem, datatype, image, address, helpers } from 'faker';

export const makeFakeLocation = (): LocationType => ({
  latitude: Number(address.latitude),
  longitude: Number(address.longitude),
  zoom: 10
});

export const makeFakeCityLocation = (): CityLocationType => ({
  name: lorem.word(),
  location: makeFakeLocation()
});

export const makeFakePersonData = (): PersonDataType => ({
  name: 'Jhon Doe',
  avatarUrl: image.avatar(),
  isPro: datatype.boolean()
});

const arrayOfCityImages: string[] = [];
for (let i = 0; i <= 8; i++) {
  arrayOfCityImages.push(image.city());
}

export const makeFakeDetailedOffer = (): OfferInDetailType => ({
  id: lorem.word(),
  title: lorem.word(3),
  type: helpers.randomize(['room', 'apartament', 'manson']),
  price: datatype.number(500),
  previewImage: image.imageUrl(),
  city: makeFakeCityLocation(),
  location: makeFakeLocation(),
  isFavorite: datatype.boolean(),
  isPremium: datatype.boolean(),
  rating: datatype.number(5),
  description: lorem.sentence(12),
  bedrooms: datatype.number(3),
  goods: datatype.array(8),
  host: makeFakePersonData(),
  images: arrayOfCityImages,
  maxAdults: datatype.number(5),

} as OfferInDetailType);

export const makeFakeOffer = (): OfferType => ({
  id: lorem.word(),
  title: lorem.word(3),
  type: helpers.randomize(['room', 'apartament', 'manson']),
  price: datatype.number(500),
  previewImage: image.imageUrl(),
  images: arrayOfCityImages,
  city: makeFakeCityLocation(),
  location: makeFakeLocation(),
  isFavorite: datatype.boolean(),
  isPremium: datatype.boolean(),
  rating: datatype.number(5)
} as OfferType);
