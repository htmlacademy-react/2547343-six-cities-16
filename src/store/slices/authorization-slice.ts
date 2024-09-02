import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../constants';
import { AuthorizationType } from '../types';
import { checkAuthAction, loginAction, logoutAction } from '../../services/api-actions';

export const authorizationState: AuthorizationType = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userEmail: null,
};

export const authorizationSlice = createSlice({
  name: 'authorization',
  initialState: authorizationState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.userEmail = action.payload;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.userEmail = action.payload;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.userEmail = null;
      });
  },
  selectors: {
    selectAutorizationStatus: (state) => state.authorizationStatus,
    selectUserEmail: (state) => state.userEmail,
  }
});

export const { selectAutorizationStatus, selectUserEmail } = authorizationSlice.selectors;
