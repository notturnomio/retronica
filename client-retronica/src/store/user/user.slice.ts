import { createSlice } from '@reduxjs/toolkit';
import { getLocalStorage } from 'utils/local-storage';

import * as actions from './user.actions';
import type { IUserInitialState } from './user.interface';

const initialState: IUserInitialState = {
  user: getLocalStorage('user'),
  isLoading: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // Registration
    builder
      .addCase(actions.register.pending, state => {
        state.isLoading = true;
      })
      .addCase(actions.register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoading = false;
      })
      .addCase(actions.register.rejected, state => {
        state.isLoading = false;
      });

    // Login
    builder
      .addCase(actions.login.pending, state => {
        state.isLoading = true;
      })
      .addCase(actions.login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoading = false;
      })
      .addCase(actions.login.rejected, state => {
        state.isLoading = false;
      });

    // Logout
    builder
      .addCase(actions.logout.pending, state => {
        state.isLoading = true;
      })
      .addCase(actions.logout.fulfilled, state => {
        state.user = null;
        state.isLoading = false;
      })
      .addCase(actions.logout.rejected, state => {
        state.isLoading = false;
        state.user = null;
      });

    // Check auth
    builder
      .addCase(actions.checkAuth.pending, state => {
        state.isLoading = true;
      })
      .addCase(actions.checkAuth.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoading = false;
      })
      .addCase(actions.checkAuth.rejected, state => {
        state.isLoading = false;
        state.user = null;
      });
  }
});
