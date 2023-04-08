import { createReducer } from '@reduxjs/toolkit';
import { changeCity, loadOffers, setAuthorizationStatus, setOffersLoadingStatus } from './action';
import { Offers } from '../types/offers';
import { AuthorizationStatus } from '../constants/const';

type InitialStateProps = {
  currentCity: string;
  offers: Offers | [];
  areOffersLoading: boolean;
  authorizationStatus: AuthorizationStatus;
}

const initialState: InitialStateProps = {
  currentCity: 'Paris',
  offers: [],
  areOffersLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
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
    });
});

export {reducer};
