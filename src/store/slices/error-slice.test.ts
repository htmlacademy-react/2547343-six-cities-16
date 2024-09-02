import { ErrorType } from '../types';
import { errorSlice, setError } from './error-slice';

describe('Error Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState: ErrorType = {
      error: null,
    };

    const result = errorSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set error value to "Very Bad Error!" with setError action', () => {
    const newValue: string = 'Very Bad Error!';

    const initialState: ErrorType = {
      error: null,
    };

    const result = errorSlice.reducer(initialState, setError(newValue));

    expect(result.error).toBe(newValue);
  });
});
