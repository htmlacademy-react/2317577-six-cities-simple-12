import { createAction } from '@reduxjs/toolkit';
import { Offers } from '../types/offers';
import { AuthorizationStatus } from '../constants/const';

export const Action = {
  CHANGE_CITY: 'CHANGE_CITY',
  LOAD_OFFERS: 'LOAD_OFFERS',
  SET_OFFERS_LOADING_STATUS: 'SET_OFFERS_LOADING_STATUS',
  SET_AUTHORIZATION_STATUS: 'SET_AUTHORIZATION_STATUS',
  SET_ERROR: 'SET_ERROR',
};

export const changeCity = createAction<string>(Action.CHANGE_CITY);

export const loadOffers = createAction<Offers>(Action.LOAD_OFFERS);

export const setOffersLoadingStatus = createAction<boolean>(Action.SET_OFFERS_LOADING_STATUS);

export const setAuthorizationStatus = createAction<AuthorizationStatus>(Action.SET_AUTHORIZATION_STATUS);

export const setError = createAction<string | null>(Action.SET_ERROR);
