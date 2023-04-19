import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../constants/const';
import { offersData } from './offers/offers';
import { currentCityData } from './city/city';
import { userData } from './user/user';
import { commentsData } from './comments/comments';

export const rootReducer = combineReducers({
  [NameSpace.Offers]: offersData.reducer,
  [NameSpace.City]: currentCityData.reducer,
  [NameSpace.User]: userData.reducer,
  [NameSpace.Comments]: commentsData.reducer,
});
