import { CityStateType } from '../types';
import { citySlice, setCity } from './city-slice';

describe('City Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState: CityStateType = {
      city: 'Paris',
    };

    const result = citySlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set city value to amsterdam with setCity action', () => {
    const newValue = 'amsterdam';

    const initialState: CityStateType = {
      city: 'Paris',
    };

    const result = citySlice.reducer(initialState, setCity(newValue));

    expect(result.city).toBe(newValue);
  });
});
