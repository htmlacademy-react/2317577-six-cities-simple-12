import { store } from '../store/index';
import { AuthorizationStatus } from '../constants/const';
import { Offer, Offers } from './offers';
import { UserInfo } from './userInfo';
import { FilterOptions } from './filterOptions';
import { Comments } from './comments';

export type OffersData = {
  offers: Offers;
  singleOffer: Offer | undefined;
  notFoundSingleOfferError: boolean;
  isSingleOfferLoading: boolean;
  nearbyOffers: Offers;
  areNearbyOffersLoading: boolean;
  areOffersLoading: boolean;
  filterOptions: FilterOptions;
  error: boolean;
};

export type CommentsData = {
  comments: Comments;
  areCommentsLoading: boolean;
}

export type CurrentCityData = {
  currentCity: string;
};

export type UserData = {
  userInfo: Omit<UserInfo, 'token'> | undefined;
  authorizationStatus: AuthorizationStatus;
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
