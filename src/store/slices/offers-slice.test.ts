import { LoadingStatus } from '../../constants';
import { SortingType } from '../../types';
import { makeFakeOffer } from '../../utils/mock';
import { OffersStateType } from '../types';
import { offersSlice, setSortingMode, toggleFavoriteInOffers } from './offers-slice';

describe('Offers Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState: OffersStateType = {
      offers: [],
      isOffersLoading: LoadingStatus.NotLoaded,
      sortingMode: {
        name: 'Popular',
        value: 'Popular'
      }
    };

    const result = offersSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set "sortingMode" to "Rating" sorting type by "setSortingMode" action', () => {
    const newSortingMode: SortingType = {
      name: 'Rating',
      value: 'Top rated first'
    };

    const initialState: OffersStateType = {
      offers: [],
      isOffersLoading: LoadingStatus.NotLoaded,
      sortingMode: {
        name: 'Popular',
        value: 'Popular'
      }
    };

    const result = offersSlice.reducer(initialState, setSortingMode(newSortingMode));

    expect(result.sortingMode).toEqual(newSortingMode);
  });

  it('should toggle "isFavorite" in particular offer from offers array by it\'s id with "toggleFavoriteInOffers" action', () => {
    /** Генерируем изначальный массив предложений */
    const generatedArray = [];
    for (let i = 0; i <= 3; i++) {
      generatedArray.push(makeFakeOffer());
    }

    /** Генерируем предложение которое будем модицифировать для проверки */
    const offerToChange = makeFakeOffer();
    offerToChange.isFavorite = false;
    const { id } = offerToChange;

    /** Собираем начальное значение стейта */
    const initialOffers = [...generatedArray, offerToChange];
    const initialState: OffersStateType = {
      offers: initialOffers,
      isOffersLoading: LoadingStatus.NotLoaded,
      sortingMode: {
        name: 'Popular',
        value: 'Popular'
      }
    };

    /** Собираем значение массива предложений после примения "toggleFavoriteInOffers" */
    const expextedOffer = { ...offerToChange, isFavorite: true };
    const expectedOffers = [...generatedArray, expextedOffer];

    const result = offersSlice.reducer(initialState, toggleFavoriteInOffers(id));

    expect(result.offers).toEqual(expectedOffers);
  });
});
