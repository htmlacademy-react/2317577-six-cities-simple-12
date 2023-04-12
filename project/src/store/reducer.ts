import { createReducer } from '@reduxjs/toolkit';
import { changeCity, loadOffers, setAuthorizationStatus, setError, setOffersLoadingStatus, setUserInfo } from './action';
import { Offers } from '../types/offers';
import { AuthorizationStatus } from '../constants/const';
import { UserInfo } from '../types/userInfo';

type InitialStateProps = {
  currentCity: string;
  offers: Offers | [];
  areOffersLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  error: string | null;
  userInfo: Omit<UserInfo, 'token'> | undefined;
}

const initialState: InitialStateProps = {
  currentCity: 'Paris',
  offers: [],
  areOffersLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  error: '',
  userInfo: undefined,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.currentCity = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setOffersLoadingStatus, (state, action) => {
      state.areOffersLoading = action.payload;
    })
    .addCase(setAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(setUserInfo, (state, action) => {
      state.userInfo = action.payload;
    });
});

export {reducer};
