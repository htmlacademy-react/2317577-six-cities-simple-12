import { createReducer } from '@reduxjs/toolkit';
import { changeCity, loadOffers, setAuthorizationStatus, setError, setOffersLoadingStatus } from './action';
import { Offers } from '../types/offers';
import { AuthorizationStatus } from '../constants/const';

type InitialStateProps = {
  currentCity: string;
  offers: Offers | [];
  areOffersLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  error: string | null;
}

const initialState: InitialStateProps = {
  currentCity: 'Paris',
  offers: [],
  areOffersLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  error: '',
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
    });
});

export {reducer};
