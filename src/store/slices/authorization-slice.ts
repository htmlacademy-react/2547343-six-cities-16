import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../constants';
import { AuthorizationType } from '../types';

export const AuthorizationState: AuthorizationType = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userEmail: null,
};

export const authorizationSlice = createSlice({
  name: 'authorization',
  initialState: AuthorizationState,
  reducers: {
    setAuthorizationStatus: (state, action: PayloadAction<AuthorizationStatus>) => {
      state.authorizationStatus = action.payload;
    },
    setUserEmail: (state, action: PayloadAction<string>) => {
      state.userEmail = action.payload;
    },
  }
});

export const { setAuthorizationStatus, setUserEmail } = authorizationSlice.actions;

export const selectAutorizationStatus = (state: AuthorizationType) =>
  state.authorization.authorizationStatus;
export const selectUserEmail = (state: AuthorizationType) => state.authorization.userEmail;
