import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance, AxiosResponse } from 'axios';
import { Offer, Offers } from '../types/offers';
import { redirectToRoute } from './action';
import { APIRoute, Approute } from '../constants/const';
import { AuthInfo } from '../types/authInfo';
import { UserInfo } from '../types/userInfo';
import { dropToken, saveToken } from '../services/token';
import { Comments } from '../types/comments';

export const fetchOffersAction = createAsyncThunk<
  Offers,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('LOAD_OFFERS', async (_arg, { dispatch, extra: api }) => {
  const { data } = await api.get<Offers>(APIRoute.Offers);
  return data;
});

export const fetchSingleOfferAction = createAsyncThunk<
  Offer,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('LOAD_OFFER', async (id, { dispatch, extra: api }) => {
  const { data } = await api.get<Offer>(`${APIRoute.Offers}/${id}`);
  return data;
});

export const fetchNearbyOffersAction = createAsyncThunk<
  Offers,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('LOAD_NEARBY_OFFERS', async (id, { dispatch, extra: api }) => {
  const { data } = await api.get<Offers>(
    `${APIRoute.Offers}/${id}/nearby`
  );
  return data.slice(0, 3);
});

export const fetchCommentsAction = createAsyncThunk<
  Comments,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('LOAD_COMMENTS', async (hotelId, { dispatch, extra: api }) => {
  const { data } = await api.get<Comments>(`${APIRoute.Comments}/${hotelId}`);
  return data.slice(0, 10);
});

export const postCommentAction = createAsyncThunk<
  Comments,
  { hotelId: number; comment: string; rating: number },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'POST_COMMENT',
  async ({ hotelId, comment, rating }, { dispatch, extra: api }) => {
    const { data } = await api.post<Comments>(
      `${APIRoute.Comments}/${hotelId}`,
      {
        comment,
        rating,
      }
    );
    return data;
  }
);

export const checkAuthAction = createAsyncThunk<
  UserInfo,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('CHECK_AUTHORIZATION', async (_arg, { dispatch, extra: api }) => {
  const { data }: AxiosResponse<UserInfo> = await api.get(APIRoute.Login);
  return data;
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
  const { data } = await api.post<UserInfo>(APIRoute.Login, {
    email,
    password,
  });
  saveToken(data.token);
  dispatch(checkAuthAction());
  dispatch(redirectToRoute(Approute.Main));
});

export const logoutAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('LOGOUT', async (_arg, { dispatch, extra: api }) => {
  await api.delete(APIRoute.Logout);
  dropToken();
  dispatch(redirectToRoute(Approute.Login));
});
