import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../constants';
import { AuthorizationType } from '../types';

export const authorizationState: AuthorizationType = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userEmail: null,
};

export const authorizationSlice = createSlice({
  name: 'authorization',
  initialState: authorizationState,
  reducers: {
    setAuthorizationStatus: (state, action: PayloadAction<AuthorizationStatus>) => {
      state.authorizationStatus = action.payload;
    },
    setUserEmail: (state, action: PayloadAction<string | null>) => {
      state.userEmail = action.payload;
    },
  },
  selectors: {
    selectAutorizationStatus: (state) => state.authorizationStatus,
    selectUserEmail: (state) => state.userEmail,
  },
});

export const { setAuthorizationStatus, setUserEmail } = authorizationSlice.actions;

export const { selectAutorizationStatus, selectUserEmail } = authorizationSlice.selectors;
