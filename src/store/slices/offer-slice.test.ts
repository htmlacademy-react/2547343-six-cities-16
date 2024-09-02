
import { LoadingStatus } from '../../constants';
import { makeFakeDetailedOffer } from '../../utils/mock';
import { OfferStateType } from '../types';
import { offerSlice, toggleFavoriteInOffer } from './offer-slice';


describe('Offer Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState: OfferStateType = {
      offer: null,
      isOfferLoading: 'notLoaded',
      nearbyOffers: [],
      comments: []
    };

    const result = offerSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set "offer.isFavorite" to opposit value', () => {
    const generatedOffer = makeFakeDetailedOffer();
    const initialState: OfferStateType = {
      offer: { ...generatedOffer, isFavorite: false },
      isOfferLoading: LoadingStatus.Loaded,
      nearbyOffers: [],
      comments: []
    };

    const expectedState: OfferStateType = {
      offer: { ...generatedOffer, isFavorite: true },
      isOfferLoading: LoadingStatus.Loaded,
      nearbyOffers: [],
      comments: []
    };

    const result = offerSlice.reducer(initialState, toggleFavoriteInOffer(initialState.offer!.id));

    expect(result).toEqual(expectedState);
  });

});
