import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { Offers } from '../types/offers';
import {
  loadOffers,
  redirectToRoute,
  setAuthorizationStatus,
  setOffersLoadingStatus,
  setUserInfo,
} from './action';
import { APIRoute, Approute, AuthorizationStatus } from '../constants/const';
import { AuthInfo } from '../types/authInfo';
import { UserInfo } from '../types/userInfo';
import { saveToken } from '../services/token';

export const fetchOffersAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('LOAD_OFFERS', async (_arg, { dispatch, extra: api }) => {
  dispatch(setOffersLoadingStatus(true));
  const { data } = await api.get<Offers>(APIRoute.Offers);
  dispatch(setOffersLoadingStatus(false));
  dispatch(loadOffers(data));
});

export const checkAuthAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('CHECK_AUTHORIZATION', async (_arg, { dispatch, extra: api }) => {
  try {
    const { data } = await api.get(APIRoute.Login);
    dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
    dispatch(
      setUserInfo({
        email: data.email,
        avatarUrl: data.avatarUrl,
        id: data.id,
        isPro: data.isPro,
        name: data.name,
      })
    );
  } catch {
    dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
  }
});

export const loginAction = createAsyncThunk<
  void,
  AuthInfo,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('LOGIN', async ({ email, password }, { dispatch, extra: api }) => {
  const {
    data: { token },
  } = await api.post<UserInfo>(APIRoute.Login, { email, password });
  saveToken(token);
  dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
  dispatch(redirectToRoute(Approute.Main));
});
