import { store } from '../store/index';
import { AuthorizationStatus } from '../constants/const';
import { Offers } from './offers';
import { UserInfo } from './userInfo';
import { FilterOptions } from './filterOptions';

export type OffersData = {
  offers: Offers;
  areOffersLoading: boolean;
  filterOptions: FilterOptions;
  error: boolean;
};

export type CurrentCityData = {
  currentCity: string;
};

export type UserData = {
  userInfo: Omit<UserInfo, 'token'> | undefined;
  authorizationStatus: AuthorizationStatus;
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
