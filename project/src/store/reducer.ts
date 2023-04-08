import { createReducer } from '@reduxjs/toolkit';
import { changeCity, loadOffers, setOffersLoadingStatus } from './action';
import { Offers } from '../types/offers';


type InitialStateProps = {
  currentCity: string;
  offers: Offers | [];
  areOffersLoading: boolean;
}

const initialState: InitialStateProps = {
  currentCity: 'Paris',
  offers: [],
  areOffersLoading: false,
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
    });
});

export {reducer};
