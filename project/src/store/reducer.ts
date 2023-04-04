import { createReducer } from '@reduxjs/toolkit';
import { offers } from '../mocks/offers';
import { cities } from '../mocks/cities';
import { changeCity, fillOffers } from './action';

const initialState = {
  currentCity: cities.filter((city) => city.title === 'Paris')[0],
  offers,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      const {currentCity} = action.payload;
      state.currentCity = currentCity;
    })
    .addCase(fillOffers, (state) => {
      state.offers = offers;
    });
});

export {reducer};
